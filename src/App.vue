<template>
    <div class="container">
      <button :class="['theme-button', {'theme-dark': isDarkTheme}]" @click="toggleTheme">
        <img v-if="!isDarkTheme"  src="./assets/icons/sun.svg">
        <img v-else src="./assets/icons/moon.svg">
      </button>
      <div class="main">
        <aside class="aside">
          <img class="aside-img" src="./assets/images/Blur.png" alt="image" />
          <div class="aside-skeleton-cont">
            <v-skeleton :widths="['100%']" height="30px" />
            <v-skeleton
              :widths="['80%', '100%', '90%', '80%', '60%']"
              height="10px"
            />
            <v-skeleton :widths="['50%']" height="10px" />
          </div>
        </aside>
        <inventory :cells="inventoryContent" />
        <v-notification class="notification">
          <v-skeleton :widths="['100%']" height="30px" />
        </v-notification>
      </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import inventory from "./components/inventory/inventory.vue";
import { useInventoryStore } from "./stores/inventory";
import vNotification from "./components/ui/v-notification/v-notification.vue";
import vSkeleton from "./components/ui/v-skeleton/v-skeleton.vue";
import { onMounted } from "vue";

const inventoryStore = useInventoryStore();
const { toggleTheme } = inventoryStore;
const { inventoryContent, isDarkTheme } = storeToRefs(inventoryStore);

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDarkTheme.value = savedTheme === "dark";
  } else {
    isDarkTheme.value = true; 
  }

  document.documentElement.setAttribute("data-theme", isDarkTheme.value ? "dark" : "light");
});
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

}
.main {
  height: 90vh;
  display: grid;
  gap: 24px;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 1fr 72px;
}
.aside-skeleton-cont {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.notification {
  grid-row: 2/3;
  grid-column: 1/3;
}
.aside {
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 2px solid var(--border-color);
  background-color: var(--app-main);
}

.aside-img {
  align-self: center;
}
.theme-button{
  position: absolute;
  top: 10px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: rgb(130, 205, 224);
  border-radius: 100%;
  border: 1px solid gold
}
.theme-dark{
  background-color: white;
}
</style>
