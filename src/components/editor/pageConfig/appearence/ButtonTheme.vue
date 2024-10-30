<template>
  <button
    class="rounded-2xl flex items-center py-[10px] px-5 gap-x-3 transition duration-200 w-full"
    :class="isActive ? 'bg-custom-green-2' : 'bg-custom-black-3'"
    @click="emit('click')"
  >
    <slot :isActive="isActive"></slot>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  isActive?: boolean;
}

defineProps<Props>();
const emit = defineEmits(["click"]);
</script>
