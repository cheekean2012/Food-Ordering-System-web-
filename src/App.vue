<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>


export default {
  components: {
  }
}
</script>

<style>
    /* Transitions */
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.2s;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>
