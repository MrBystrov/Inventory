import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { TCell } from '@/components/inventory/types';

export const useInventoryStore = defineStore('inventory', () => {
const isDarkTheme = ref<boolean>(false)
const selectedCell = ref<TCell | null>(null)
const isConfirmDelete = ref<boolean>(false);
const deleteNumber = ref<number | null>(null);


  const inventoryContent = ref<TCell[]>([
  { item: 'Item 1', quantity: 3, color: 'red', id: '43' },
  { item: null  },
  { item: null }, 
  { item: 'Item 3', quantity: 2, color: 'green', id: '22' },
  { item: null },
  { item: 'Item 2', quantity: 2, color: 'blue', id: '23' },
  { item: null},
  { item: null},
  { item: null},
  { item: null},
  { item: null},
  { item: null},
  { item: null},
  { item: null},
  { item: null},
  { item: null},
  { item: null},
  { item: null},
  { item: null},
  { item: null},
  { item: null},
  { item: null},
  { item: null},
  { item: null},
  { item: null},
]);

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  const theme = isDarkTheme.value ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

  return { inventoryContent, selectedCell, isConfirmDelete, deleteNumber, isDarkTheme, toggleTheme }
})
