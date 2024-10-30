<template>
  <button
    class="rounded-2xl flex items-center justify-between py-[10px] px-5 gap-x-3 transition duration-200 drop-shadow-black border border-white"
    @click="onClick && onClick()"
    :style="{ ...style }"
  >
    <div class="flex items-center gap-x-4">
      <div
        class="aspect-square w-8 h-8 drop-shadow-black grid place-items-center rounded-lg overflow-hidden bg-white"
      >
        <img
          v-if="icon"
          :src="icon"
          alt="Bancolombia"
          loading="lazy"
          class="size-full aspect-square"
          width="50"
          height="50"
        />
        <IconBank v-else class="size-full text-custom-black-2 p-1" />
      </div>
      <h4 class="md:text-lg font-semibold">
        {{ text }}
      </h4>
    </div>
  </button>
</template>

<script setup lang="ts">
import IconBank from "@/components/icons/IconBank.vue";
import { IMethodStyle } from "@/interfaces/editor";

interface Props {
  onClick?: () => void;
  icon?: string;
  text: string;
  style?: IMethodStyle;
}

defineProps<Props>();
</script>
