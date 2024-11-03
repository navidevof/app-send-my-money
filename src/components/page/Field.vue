<template>
  <div class="flex flex-col gap-y-1 items-center w-full mx-auto max-w-xs">
    <div class="flex justify-between items-center w-full">
      <h3 class="font-medium truncate">{{ field.label }}</h3>
      <button
        @click="() => handleCopy(field.value)"
        class="transition duration-200"
      >
        <IconCopy
          v-if="!isCopied"
          class="size-5 min-w-5 text-custom-green-1 cursor-pointer"
        />
        <span v-else>Copied! 🎉</span>
      </button>
    </div>
    <div
      class="rounded-2xl drop-shadow-black border border-white/50 w-full px-5 py-2"
      :style="{ ...style }"
    >
      {{ field.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import IconCopy from "@/components/icons/IconCopy.vue";
import { IField, IMethodStyle } from "@/interfaces/page";
import { ref } from "vue";

interface Props {
  field: IField;
  style: IMethodStyle;
}

defineProps<Props>();

const isCopied = ref<boolean>(false);

const handleCopy = (value: string) => {
  navigator.clipboard.writeText(value);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 3500);
};
</script>
