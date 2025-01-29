<template>
  <div class="skeleton-container" :style="{ justifyContent: justify, alignItems: align}">
    <div
      v-for="(width, index) in widths"
      :key="index"
      class="skeleton-item"
      :style="{ width: width, height: height }"
    ></div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  widths: {
    type: Array,
    required: true, 
  },
  height: {
    type: String,
    default: '1rem', 
  },
  justify: {
    type: String,
    default: 'space-between'
  },
  align: {
    type: String,
    default: 'center'
  },
});

if (!props.widths || props.widths.length === 0) {
  console.warn('Skeleton: Пропс "widths" должен быть массивом с хотя бы одним элементом.');
}
</script>

<style scoped>
.skeleton-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skeleton-item {
  background-color: var(--border-color); 
  border-radius: 4px; 
  animation: pulse 1.5s infinite ease-in-out; 
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}
</style>