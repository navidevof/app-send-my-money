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
      @click="() => handleClick(method)"
    />
  </aside>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditor } from "@/components/editor/store";
import ButtonMethod from "./ButtonMethod.vue";
import { IMethod } from "@/interfaces/editor";

interface Props {
  showModalDetail: () => void;
}

const { showModalDetail } = defineProps<Props>();

const editorStore = useEditor();
const { page, currentMethod } = storeToRefs(editorStore);

const handleClick = (method: IMethod) => {
  currentMethod.value = method;
  showModalDetail();
};
</script>
