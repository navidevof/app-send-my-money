<template>
  <button
    class="py-2 px-4 rounded-lg bg-custom-black-1 h-fit hover:bg-custom-black-3 flex items-center gap-x-2 transition duration-200"
    :class="
      isActive
        ? 'bg-custom-black-3 text-white'
        : 'text-white/70 hover:text-white'
    "
    @click="emit('click')"
    name="tab"
    @dblclick="emit('dbclick')"
  >
    <slot :isActive="isActive"></slot>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  isActive?: boolean;
}

defineProps<Props>();
const emit = defineEmits(["dbclick", "click"]);
</script>
