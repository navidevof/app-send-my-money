<template>
  <button
    @click="emit('click')"
    class="rounded-full w-full bg-custom-green-1 flex items-center text-center justify-center py-3 px-5 gap-x-2"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  isActive?: boolean;
  onClick?: () => void;
}

defineProps<Props>();
const emit = defineEmits(["click"]);
</script>
