<template>
  <div class="flex items-center w-full gap-1">
    <button
      class="rounded-2xl flex items-center justify-between py-[10px] px-5 gap-x-3 transition duration-200 w-full"
      :class="isActive ? 'bg-custom-green-2' : 'bg-custom-black-3'"
      @click="emit('click')"
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
        <h4 class="text-white xl:text-lg" :class="isActive && 'font-semibold'">
          {{ text }}
        </h4>
      </div>
      <IconDrag
        class="size-4"
        :class="isActive ? 'text-white' : 'text-custom-green-1'"
      />
    </button>
    <button
      @click="emit('delete')"
      class="text-custom-red-1 text-sm font-light mr-auto ml-2"
    >
      <IconTrash class="size-4 text-custom-red-1" />
    </button>
  </div>
</template>

<script setup lang="ts">
import IconBank from "@/components/icons/IconBank.vue";
import IconDrag from "@/components/icons/IconDrag.vue";
import IconTrash from "@/components/icons/IconTrash.vue";

interface Props {
  isActive?: boolean;
  onClick?: () => void;
  icon?: string;
  text: string;
}

defineProps<Props>();
const emit = defineEmits(["click", "delete"]);
</script>
