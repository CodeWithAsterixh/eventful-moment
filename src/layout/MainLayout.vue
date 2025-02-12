<script setup>
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>
<template>
  <HeaderComponent />

  <main class="w-full py-10 px-4 sm:px-8 min-h-screen">
    <slot></slot>
  </main>
  <FooterComponent />
</template>
