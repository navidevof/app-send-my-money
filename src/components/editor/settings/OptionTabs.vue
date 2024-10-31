<template>
  <div class="min-h-fit flex gap-x-3 items-center justify-between w-full">
    <div
      class="min-h-fit flex gap-x-1 overflow-x-auto custom-scroll pb-1 items-center w-full"
      v-auto-animate="{ duration: 200 }"
      ref="$tabs"
    >
      <OptionTab
        v-for="option in currentMethod?.options"
        :key="option.id"
        :option="option"
        @deleteOption="onDeleteOption"
      />
    </div>
    <MainButton @click="addNewOption" class="!w-fit !p-1 !rounded-full">
      <IconPlus class="size-6 text-white" />
    </MainButton>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useEditor } from "../store";
import { newOption } from "@/mocks/editor";

import MainButton from "@/components/ui/MainButton.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import OptionTab from "./OptionTab.vue";
import { IOption } from "@/interfaces/editor";

const editorStore = useEditor();
const { currentMethod, currentOption } = storeToRefs(editorStore);
const $tabs = ref<HTMLElement>();

const addNewOption = () => {
  if (!currentMethod.value) return;
  currentMethod.value?.options.push(newOption());
  currentOption.value =
    currentMethod.value.options[currentMethod.value.options.length - 1];

  setTimeout(() => {
    $tabs.value?.scrollTo({
      left: $tabs.value.scrollWidth,
      behavior: "smooth",
    });
  }, 300);
};

const onDeleteOption = (option: IOption) => {
  if (!currentMethod.value) return;
  const updatedOptions = currentMethod.value.options.filter(
    (opt) => opt.id !== option.id
  );
  currentMethod.value.options = updatedOptions;

  setTimeout(() => {
    $tabs.value?.scrollTo({
      left: $tabs.value.scrollWidth,
      behavior: "smooth",
    });
  }, 300);
};

onMounted(() => {
  if (!currentMethod.value) return;
  currentOption.value = currentMethod.value.options[0];
});
</script>
