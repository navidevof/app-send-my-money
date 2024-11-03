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
        @duplicateOption="(option) => addNewOption(option)"
        @click.native="scrollToCenter(option)"
      />
    </div>
    <MainButton @click="() => addNewOption()" class="!w-fit !p-1 !rounded-full">
      <IconPlus class="size-6 text-white" />
    </MainButton>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref, nextTick } from "vue";
import { usePage } from "../../../store/page";
import { newOption } from "@/mocks/editor";

import MainButton from "@/components/ui/MainButton.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import OptionTab from "./OptionTab.vue";
import { IOption } from "@/interfaces/page";

const pageStore = usePage();
const { currentMethod, currentOption } = storeToRefs(pageStore);
const $tabs = ref<HTMLElement>();

const addNewOption = async (option?: IOption) => {
  if (!currentMethod.value) return;

  currentMethod.value?.options.push(option ?? newOption());

  await nextTick();

  setTimeout(() => {
    $tabs.value?.scrollTo({
      left: $tabs.value.scrollWidth,
      behavior: "smooth",
    });

    if (!currentMethod.value) return;

    currentOption.value =
      currentMethod.value.options[currentMethod.value.options.length - 1];
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

const scrollToCenter = async (option: IOption) => {
  await nextTick();
  if (!currentMethod.value || !$tabs.value) return;

  const optionIndex = currentMethod.value.options.findIndex(
    (opt) => opt.id === option.id
  );

  const optionTab = $tabs.value.children[optionIndex] as HTMLElement;
  const containerWidth = $tabs.value.clientWidth;
  const optionTabWidth = optionTab.clientWidth;
  const optionTabLeft = optionTab.offsetLeft;

  // Calculate the position to center the selected tab
  const scrollPosition =
    optionTabLeft - containerWidth / 2 + optionTabWidth / 2;

  $tabs.value.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });
};

onMounted(() => {
  if (!currentMethod.value) return;
  currentOption.value = currentMethod.value.options[0];
});
</script>
