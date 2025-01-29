<template>
  <div v-if="isVisible" class="notification">
    <button class="close-button" @click="closeNotification">&times;</button>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isVisible = ref(true);

const closeNotification = () => {
  isVisible.value = false;
};
</script>

<style scoped>
.notification {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--app-main);
  border: 1px solid var(--border-color);
  padding: 10px 40px 10px 10px;
  min-height: 50px;
  padding-right: 40px;
  border-radius: 10px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: var(--border-color); /* Цвет кнопки закрытия */
}

</style>