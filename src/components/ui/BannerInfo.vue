<template>
  <div
    class="flex py-3 w-full px-3 divide-x-2 divide-white/50 rounded-lg items-center bg-custom-black-3"
  >
    <span class="pr-3 text-xl">💡</span>
    <h3 class="pl-3 text-white text-sm font-light">
      {{ text }}
    </h3>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string;
}

defineProps<Props>();
</script>
