<template>
  <main class="flex flex-col bg-custom-black-1 min-h-screen">
    <Header />
    <router-view />
  </main>
</template>

<script setup lang="ts">
import Header from "@/components/common/Header.vue";
</script>
