<template>
  <div class="flex items-center w-full gap-1">
    <button
      class="rounded-2xl flex items-center justify-between py-[10px] px-5 gap-x-3 transition duration-200 w-full"
      :class="isActive ? 'bg-custom-green-2' : 'bg-custom-black-3'"
      @click="emit('click')"
    >
      <div class="flex items-center gap-x-3">
        <ImageBank :icon="icon" />
        <h4
          class="text-white xl:text-lg line-clamp-1 w-full text-start overflow-hidden flex-1"
          :class="isActive && 'font-semibold'"
        >
          {{ text }}
        </h4>
      </div>
      <IconDrag
        class="size-4 min-w-4"
        :class="isActive ? 'text-white' : 'text-custom-green-1'"
      />
    </button>
    <button
      @click="emit('delete')"
      class="text-custom-red-1 text-sm font-light mr-auto ml-2"
    >
      <IconTrash class="size-5 min-w-5 text-custom-red-1" />
    </button>
  </div>
</template>

<script setup lang="ts">
import IconDrag from "@/components/icons/IconDrag.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import ImageBank from "@/components/ui/ImageBank.vue";

interface Props {
  isActive?: boolean;
  onClick?: () => void;
  icon?: string;
  text: string;
}

defineProps<Props>();
const emit = defineEmits(["click", "delete"]);
</script>
