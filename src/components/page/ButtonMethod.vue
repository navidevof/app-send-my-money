<template>
  <button
    class="rounded-2xl flex items-center justify-between py-[10px] px-5 gap-x-3 transition duration-200 drop-shadow-black border border-white"
    @click="onClick && onClick()"
    :style="{ ...style }"
  >
    <div class="flex items-center gap-x-4">
      <ImageBank :icon="icon" />
      <h4 class="md:text-lg font-semibold">
        {{ text }}
      </h4>
    </div>
  </button>
</template>

<script setup lang="ts">
import ImageBank from "@/components/ui/ImageBank.vue";
import { IMethodStyle } from "@/interfaces/page";

interface Props {
  onClick?: () => void;
  icon?: string;
  text: string;
  style?: IMethodStyle;
}

defineProps<Props>();
</script>
