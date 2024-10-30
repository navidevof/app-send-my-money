<template>
  <aside
    class="grow flex flex-col gap-y-4 w-full"
    v-auto-animate="{ duration: 200 }"
  >
    <ButtonMethod
      v-for="method in page.methods"
      :key="method.id"
      :text="method.name"
      :icon="method.icon"
      :style="page.styles.method"
      @click="() => console.log('click')"
    />
  </aside>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditor } from "@/components/editor/store";
import ButtonMethod from "./ButtonMethod.vue";

const editorStore = useEditor();
const { page } = storeToRefs(editorStore);
</script>
