<template>
  <div class="flex flex-col gap-y-2 w-full">
    <button
      v-show="!showInput"
      class="flex gap-x-2 items-center"
      @click="showInput = true"
    >
      <h3 class="text-white font-medium">{{ field.label }}</h3>
      <IconPencil class="size-5 text-custom-green-1 cursor-pointer" />
    </button>
    <input
      ref="$inputRef"
      v-show="showInput"
      class="w-full text-white bg-transparent"
      type="text"
      :autofocus="showInput"
      v-model="field.label"
      @blur="showInput = false"
      @keyup.enter="showInput = false"
      placeholder="Field name"
    />
    <input
      class="w-full px-5 py-2 rounded-lg font-light bg-custom-black-3 text-white"
      type="text"
      v-model="field.value"
      placeholder="Field value"
    />
    <button
      @click="emit('delete')"
      class="text-custom-red-1 text-sm font-light ml-auto mr-2 -mt-1"
    >
      Delete
    </button>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from "vue";
import IconPencil from "@/components/icons/IconPencil.vue";
import { IField } from "@/interfaces/editor";

interface Props {
  field: IField;
}

defineProps<Props>();
const emit = defineEmits(["delete"]);

const $inputRef = ref<HTMLInputElement>();
const showInput = ref<boolean>(false);

watch(showInput, async (newVal) => {
  if (newVal) {
    await nextTick();
    $inputRef.value?.focus();
  }
});
</script>
