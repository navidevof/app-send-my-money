<template>
  <div class="flex flex-col gap-y-3 w-full">
    <MainButton>
      <IconSave class="size-6 text-white" />
      <span class="text-lg font-semibold text-white">Save</span>
    </MainButton>
    <MainButton
      @click="editorStore.onAddNewMethod"
      v-show="pageConfigCurrentTab === 'Methods'"
    >
      <IconPlus class="size-6 text-white" />
      <span class="2xl:text-lg font-semibold text-white">Add method</span>
    </MainButton>
  </div>
</template>

<script setup lang="ts">
import { useEditor } from "../store";
import { storeToRefs } from "pinia";

import MainButton from "@/components/ui/MainButton.vue";
import IconSave from "@/components/icons/IconSave.vue";
import IconPlus from "@/components/icons/IconPlus.vue";

const editorStore = useEditor();
const { pageConfigCurrentTab } = storeToRefs(editorStore);
</script>
