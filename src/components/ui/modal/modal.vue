<template>
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
          <button class="close-button" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">   
          </slot>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import type { IModalProps } from "./types";
import vTransitionFade from "../v-transition/v-transition-fade/v-transition-fade.vue";

const props = defineProps<IModalProps>();

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeModal();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>

.modal {
  display: flex;
  flex-direction: column;
  position: absolute;
  background: var(--app-main);
  padding: 20px;
  justify-content: space-between;
  border-radius: 8px;
  width: 100%;
  min-width: 260px;
  height: 100%;
  top: 0;
  right: 0px; 
  max-width: 260px;
  min-height: 100%;
  border: 2px solid var(--border-color);
  transition: transform 0.3s ease; 
  opacity: 0.93;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.modal-header h2 {
  margin: 0;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  color: var(--main-text-contrast);
  cursor: pointer;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-footer {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-top: 2px solid var(--border-color);
  padding-top: 10px;
}

:deep(.v-button) {
  width: 100%;
}



</style>

