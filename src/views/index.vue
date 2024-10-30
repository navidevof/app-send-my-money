<template>
  <main class="flex flex-col bg-custom-black-1 min-h-[100dvh]">
    <Header />
    <router-view />
  </main>
</template>

<script setup lang="ts">
import Header from "@/components/common/Header.vue";
</script>
