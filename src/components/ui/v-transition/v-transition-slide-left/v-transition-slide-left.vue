<template>
<transition mode="in-out" name="modal">
  <slot />
  </transition>
</template>

<style lang="scss" scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  right: 0;
}
</style>

