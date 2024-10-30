<template>
  <header
    class="flex items-center gap-x-1 min-h-fit overflow-x-auto custom-scroll"
  >
    <TabButton
      v-for="tab in TABS"
      :key="tab"
      :isActive="tab === pageConfigCurrentTab"
      @click="pageConfigCurrentTab = tab"
    >
      <template #default="{ isActive }">
        <h3
          class="text-lg xl:text-xl font-semibold transition duration-200"
          :class="isActive ? 'text-white ' : 'text-white/70'"
        >
          {{ tab }}
        </h3>
      </template>
    </TabButton>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditor } from "../store";
import TabButton from "@/components/ui/TabButton.vue";

const editorStore = useEditor();
const { TABS, pageConfigCurrentTab } = storeToRefs(editorStore);
</script>
