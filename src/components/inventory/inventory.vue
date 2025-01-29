<template>
  <div class="inventory-container">
    <div class="inventory">
      <div
        v-for="(cell, index) in props.cells"
        :key="index"
        :class="['cell', { 'cell-selected':  cell.item && cell.id === selectedCell?.id }]"
        @dragover.prevent="onDragOver(index, event)"
        @drop="onDrop(index)"
        >
        <v-item
          v-if="cell.item"
          :class="['item', `item--${cell.color}`, {'item--dragging': cell.item && cell.id === dragging}]"
          :draggable="true"
          @dragstart="onDragStart(index, String(cell.id))"
          @dragend="onDragEnd"
          @click="handleOpenModal(cell)"
          :cell="cell"
          size="m"
        >

        </v-item>
      </div>
    </div>
    <transition mode="in-out" name="modal">
    <modal class="inventory-modal" ref="modalDel" v-if="isOpen" @close="onCloseModal">
      <template #header>
        <div class="item-image">
          <v-item :detailed="true" :cell="selectedCell" size="xl"></v-item>
        </div>
      </template>
      <template #body>
       <div class="skeleton-container">
         <v-skeleton :widths="['100%']" height="30px"/>
         <v-skeleton :widths="['100%', '100%', '100%', '80%', '60%']" height="10px"/>
       </div>
      </template>
      <template #footer>
        <v-transition-fade>
          <v-button class="delete-btn" :text-size="14" v-if="!isConfirmDelete" color="red" @click="handeClickConfirm">Удалить предмет</v-button>
          <div v-else class="confirm-delete">
            <v-number-input v-model="deleteNumber" :min="0" :max="selectedCell?.quantity" />
            <div class="confirm-actions">
              <v-button class="actions-btn" :text-size="14" color="white" @click="handleCancelConfirm">Отмена</v-button>
              <v-button class="actions-btn" :text-size="14" color="red" @click="handleDelete">Подтвердить</v-button>
            </div>
          </div>
        </v-transition-fade>
      </template>
    </modal>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { useInventoryStore } from "@/stores/inventory";
import { defineProps, onMounted, ref, watch } from "vue";
import type { IInventory, TCell, TColor } from "./types";
import modal from "../ui/modal/modal.vue";
import { useModal } from "@/composables/useModal";
import { storeToRefs } from "pinia";
import vButton from "../ui/v-button/v-button.vue";
import vItem from "../ui/v-item/v-item.vue";
import { onClickOutside } from "@vueuse/core";
import vNumberInput from "../ui/v-number-input/v-number-input.vue";
import vSkeleton from "../ui/v-skeleton/v-skeleton.vue";
import vTransitionFade from "../ui/v-transition/v-transition-fade/v-transition-fade.vue";

const { isOpen, closeModal, openModal } = useModal();
const props = defineProps<IInventory>();
const inventoryStore = useInventoryStore();
const { selectedCell, isConfirmDelete, deleteNumber, inventoryContent } = storeToRefs(inventoryStore);
const modalDel = ref(null);
const dragging = ref<string>('')


let draggedItemIndex: number | null = null;
let draggedItemColor: TColor | undefined = undefined;

const onDragStart = (index: number, id: string) => {
  dragging.value = id
  console.log(dragging.value)
  draggedItemIndex = index;
  draggedItemColor = props.cells[draggedItemIndex].color;
  setTimeout((event: DragEvent) => {
    (event.target as HTMLElement).style.opacity = "0.4";
  }, 0);
};

const onDragEnd = (event: DragEvent) => {
  dragging.value = ''
  setTimeout((event: DragEvent) => {
    (event.target as HTMLElement).style.opacity = "1";
    draggedItemIndex = null;
    draggedItemColor = undefined;
  }, 0);

};

const onDragOver = (index: number, event: DragEvent) => {
  event.preventDefault();
};

const handeClickConfirm = (): void => {
  isConfirmDelete.value = true;
};

const handleCancelConfirm = (): void => {
  isConfirmDelete.value = false;
};

const clearAll = (): void => {
   deleteNumber.value = null;
  selectedCell.value = null;
  isConfirmDelete.value = false;
}

const handleDelete = (): void => {
  const index = inventoryContent.value.findIndex((item) => item.id === selectedCell.value?.id);
  if (inventoryContent.value[index].quantity && deleteNumber.value) {
    inventoryContent.value[index].quantity -= deleteNumber.value;
    if (inventoryContent.value[index].quantity === 0) {
      inventoryContent.value[index] = {
        item: null,
      };
    }
  }
  deleteNumber.value = null;
  isConfirmDelete.value = false;
  localStorage.setItem('inventory', JSON.stringify(inventoryContent.value))
  closeModal();
};

onClickOutside(modalDel.value, () => {
  closeModal();
});

const handleOpenModal = (cell: TCell) => {
  selectedCell.value = cell;
  isConfirmDelete.value = false
  isOpen.value = true;
  openModal();
};

const onCloseModal = () => {
  deleteNumber.value = null;
  selectedCell.value = null;
  isConfirmDelete.value = false;
  closeModal()
}

const onDrop = (targetIndex: number) => {
  if (draggedItemIndex === null || draggedItemIndex === targetIndex) return;

  const draggedItem = props.cells[draggedItemIndex].item;
  const draggedColor = props.cells[draggedItemIndex].color;
  const draggedQuantity = props.cells[draggedItemIndex].quantity;
  const draggedId = props.cells[draggedItemIndex].id;

  const targetItem = props.cells[targetIndex].item;
  const targetColor = props.cells[targetIndex].color;
  const targetQuantity = props.cells[targetIndex].quantity;
  const targetId = props.cells[targetIndex].id;

  props.cells[draggedItemIndex].item = targetItem;
  props.cells[draggedItemIndex].color = targetColor;
  props.cells[draggedItemIndex].quantity = targetQuantity;
  props.cells[draggedItemIndex].id = targetId;

  props.cells[targetIndex].item = draggedItem;
  props.cells[targetIndex].color = draggedColor;
  props.cells[targetIndex].quantity = draggedQuantity;
  props.cells[targetIndex].id = draggedId;

  const targetCellElement = document.querySelector(`.cell:nth-child(${targetIndex + 1})`);
  if (targetCellElement) {
    targetCellElement.classList.add('is-dropping');
    setTimeout(() => {
      targetCellElement.classList.remove('is-dropping');
    }, 300); 
  }
};

watch(
  inventoryContent,
  (newValue) => {
    localStorage.setItem('inventory', JSON.stringify(newValue));
  },
  { deep: true }
);

onMounted(() => {
  const savedInventory = localStorage.getItem('inventory');
  if (savedInventory) {
    inventoryContent.value = JSON.parse(savedInventory);
  }

  window.addEventListener('storage', (event) => {
    if (event.key === 'inventory') {
      inventoryContent.value = JSON.parse(event.newValue || '[]');
    }
  });
});

</script>

<style lang="scss" scoped src="./inventory.scss" />