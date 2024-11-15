<script setup lang="ts">
import Loader from "@/components/common/Loader.vue";
import { useUIStore } from "@/store/ui";
import { storeToRefs } from "pinia";
const uiStore = useUIStore();
const { isLoading } = storeToRefs(uiStore);
</script>

<template>
  <main class="flex flex-col gap-y-7 py-10">
    <router-link
      to="/"
      class="flex items-center w-fit mx-auto justify-center gap-x-2"
    >
      <img
        src="@/assets/logo.webp"
        alt="Logo Mis links de pago"
        width="50"
        height="50"
        loading="eager"
      />
      <h1 class="text-white text-center text-3xl font-bold">
        <span class="hidden md:block">Mis links de pago</span>
        <span class="md:hidden">MLDP</span>
      </h1>
    </router-link>
    <aside class="w-full register-container">
      <router-view />
    </aside>
  </main>
  <Loader v-if="isLoading" />
</template>

<style>
.register-container input:not(.input-without-style) {
  @apply w-full bg-custom-black-3 text-white rounded-lg border border-white/30 px-4 py-3;
}
</style>
