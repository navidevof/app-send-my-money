<template>
  <main class="flex flex-col min-h-[100dvh]">
    <Header />
    <router-view />
  </main>

  <Loader v-if="isLoading" />
  <ModalPremium />
</template>

<script setup lang="ts">
import Header from "@/components/common/Header.vue";
import Loader from "@/components/common/Loader.vue";
import ModalPremium from "@/components/common/ModalPremium.vue";
import { useEditor } from "@/store/editor";
import { useUIStore } from "@/store/ui";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const uiStore = useUIStore();
const editorStore = useEditor();
const { isLoading } = storeToRefs(uiStore);
const { showModalPremium } = storeToRefs(editorStore);

onMounted(() => {
  showModalPremium.value = false;
});
</script>
