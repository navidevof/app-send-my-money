<template>
  <div class="flex flex-col gap-y-1 items-center w-full mx-auto max-w-xs">
    <div class="flex justify-between items-center w-full">
      <h3 class="font-medium truncate md:text-base text-sm">
        {{ field.label }}
      </h3>
    </div>
    <div
      class="rounded-2xl drop-shadow-black border flex gap-x-1 items-center justify-between border-white/50 w-full px-5 py-2 relative"
      :style="{ ...page.styles.method }"
    >
      <span class="text-sm line-clamp-1 text-nowrap overflow-hidden">
        {{ field.value }}
      </span>
      <button
        @click="() => handleCopy(field.value)"
        class="transition duration-200 ab"
      >
        <IconCopy
          v-if="!isCopied"
          class="size-5 min-w-5 text-custom-green-1 cursor-pointer"
        />
        <span v-else class="text-sm text-nowrap">Copied! 🎉</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconCopy from "@/components/icons/IconCopy.vue";
import { IField } from "@/interfaces/page";
import { useEditor } from "../../../store/editor";
import { storeToRefs } from "pinia";
import { ref } from "vue";

interface Props {
  field: IField;
}

defineProps<Props>();

const editorStore = useEditor();
const { page } = storeToRefs(editorStore);
const isCopied = ref<boolean>(false);

const handleCopy = (value: string) => {
  navigator.clipboard.writeText(value);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 3500);
};
</script>
