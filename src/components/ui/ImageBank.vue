<template>
  <div
    class="aspect-square size-8 min-w-8 drop-shadow-black grid place-items-center rounded-lg overflow-hidden bg-white"
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
</template>

<script setup lang="ts">
import IconBank from "@/components/icons/IconBank.vue";

interface Props {
  icon?: string;
}

defineProps<Props>();
</script>
