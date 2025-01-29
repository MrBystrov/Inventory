<template>
  <div
    v-if="cell.item"
    :class="['item', `item--${cell.color}`,  {'item-not-detailed': !detailed}]"
    
  >
  <div :class="['item-blur', `item-blur--${cell.color}`, `item-blur--${size}`]"></div>
  <span v-if="!detailed" class="item-quantity">{{ cell.quantity }}</span>  
</div>
</template>

<script lang="ts" setup>
import type { ICellProps } from './types';

  const props = defineProps<ICellProps>();
</script>

<style lang="scss" scoped src="./v-item.scss"></style>
