<template>
  <input
    type="number"
    :min="min"
    :max="max"
    placeholder="Введите количество"
    :value="modelValue"
    @input="handleInput"
    @keydown="handleKeyDown"
  />
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: [Number, String],
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
  const value = event.target.value;
  if (value === '' || (value >= props.min && value <= props.max)) {
    emit('update:modelValue', value);
  } else {
    // Если значение выходит за пределы, устанавливаем значение на максимальное допустимое
    emit('update:modelValue', props.max);
  }
};

const handleKeyDown = (event) => {
  // Запрещаем ввод букв и других символов, кроме цифр и Backspace
  if (!/[0-9]|Backspace|ArrowLeft|ArrowRight|Delete/.test(event.key)) {
    event.preventDefault();
  }
};
</script>

<style scoped>
input {
  width: 100%;
  color: var(--main-text-contrast);
  padding: 8px;
  font-size: 16px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: transparent;
  appearance: textfield; /* Убираем стрелочки в Firefox */
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none; /* Убираем стрелочки в Chrome, Safari */
  margin: 0;
}
</style>