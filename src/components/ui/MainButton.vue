<template>
  <button
    :type="type"
    @click="emit('click')"
    class="rounded-full w-full disabled:cursor-not-allowed disabled:hover:bg-custom-green-1 disabled:opacity-70 bg-custom-green-1 hover:bg-custom-green-2 transition duration-200 flex items-center text-center justify-center py-3 px-5 gap-x-2"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: "submit" | "button";
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

defineProps<Props>();
const emit = defineEmits(["click"]);
</script>
