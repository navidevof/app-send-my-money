<template>
  <main class="flex flex-col min-h-[100dvh]">
    <Header />
    <router-view />
  </main>

  <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import Header from "@/components/common/Header.vue";
import Loader from "@/components/common/Loader.vue";
import { useUIStore } from "@/store/ui";
import { storeToRefs } from "pinia";

const uiStore = useUIStore();
const { isLoading } = storeToRefs(uiStore);
</script>
