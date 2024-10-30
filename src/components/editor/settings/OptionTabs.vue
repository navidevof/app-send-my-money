<template>
  <div class="min-h-fit flex gap-x-3 items-center justify-between w-full">
    <div
      class="min-h-fit flex gap-x-1 overflow-x-auto custom-scroll pb-1 items-center w-full"
      v-auto-animate="{ duration: 200 }"
      ref="$tabs"
    >
      <TabButton
        v-for="option in currentMethod?.options"
        :key="option.id"
        :isActive="currentOption?.id === option.id"
        @click="
          () =>
            currentOption?.id === option.id
              ? (showInput = true)
              : (currentOption = option)
        "
      >
        <template #default="{ isActive }">
          <h3
            class="font-semibold transition duration-200 text-nowrap"
            :class="isActive ? 'text-white ' : 'text-white/70'"
            v-show="!showInput || !isActive"
          >
            {{ option.name }}
          </h3>
          <IconPencil
            v-show="isActive && !showInput"
            class="size-5 text-custom-green-1"
          />
          <IconTrash
            @click="onDeleteOption(option)"
            v-show="
              isActive &&
              !showInput &&
              (currentMethod?.options?.length ?? 0) > 1
            "
            class="size-5 text-custom-red-1"
          />
          <input
            v-show="showInput && isActive"
            class="w-fit max-w-28 bg-custom-black-3 text-white"
            type="text"
            :autofocus="showInput"
            v-model="option.name"
            @blur="showInput = false"
            @keyup.enter="showInput = false"
            placeholder="Method name"
            @change="onChangeOptionName"
          />
        </template>
      </TabButton>
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
import IconPencil from "@/components/icons/IconPencil.vue";
import TabButton from "@/components/ui/TabButton.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import { IOption } from "@/interfaces/editor";

const editorStore = useEditor();
const { currentMethod, currentOption } = storeToRefs(editorStore);

const showInput = ref<boolean>(false);
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
  currentMethod.value.options = currentMethod.value?.options.filter(
    (o) => o.id !== option.id
  );

  currentOption.value =
    currentMethod.value.options[currentMethod.value.options.length - 1];

  setTimeout(() => {
    $tabs.value?.scrollTo({
      left: $tabs.value.scrollWidth,
      behavior: "smooth",
    });
  }, 300);
};

const onChangeOptionName = () => {
  if (!currentOption.value) return;
  if (currentOption.value.name != "") return;

  currentOption.value.name = "New option";
};

onMounted(() => {
  if (!currentMethod.value) return;
  currentOption.value = currentMethod.value.options[0];
});
</script>
