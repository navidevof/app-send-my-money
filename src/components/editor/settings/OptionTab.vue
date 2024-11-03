<template>
  <button
    class="py-2 px-4 rounded-lg hover:bg-custom-black-3 flex items-center gap-x-2 transition duration-200"
    :class="isActive && 'bg-custom-black-3'"
    @dblclick="activateEdition"
    @click="setCurrentOption"
  >
    <h3
      class="font-semibold transition duration-200 text-nowrap"
      :class="isActive ? 'text-white ' : 'text-white/70'"
      v-show="!showInput || !isActive"
      @click="setCurrentOption"
    >
      {{ option.name }}
    </h3>
    <IconPencil
      v-show="isActive && !showInput"
      class="size-5 text-custom-green-1"
      @click="activateEdition"
    />
    <IconCopy
      v-show="isActive && !showInput"
      class="size-5 text-custom-green-1"
      @click="onCopyOption"
    />
    <IconTrash
      @click.stop="handleDelete"
      v-show="
        isActive && !showInput && (currentMethod?.options?.length ?? 0) > 1
      "
      class="size-5 text-custom-red-1"
    />
    <input
      ref="$inputRef"
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
  </button>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref, nextTick, watch } from "vue";
import { usePage } from "../../../store/page";

import IconPencil from "@/components/icons/IconPencil.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import { IOption } from "@/interfaces/page";
import IconCopy from "@/components/icons/IconCopy.vue";

interface IProps {
  option: IOption;
}

const { option } = defineProps<IProps>();
const emit = defineEmits(["deleteOption", "duplicateOption"]);

const pageStore = usePage();
const { currentMethod, currentOption } = storeToRefs(pageStore);
const isActive = computed(() => currentOption.value?.id === option.id);

const $inputRef = ref<HTMLInputElement>();
const showInput = ref<boolean>(false);

const activateEdition = () => {
  showInput.value = true;
};

const setCurrentOption = () => {
  currentOption.value = option;
};

const handleDelete = async () => {
  emit("deleteOption", option);
  await nextTick();
  if (currentMethod.value?.options.length) {
    currentOption.value = currentMethod.value.options.at(-1);
  }
};

const onCopyOption = () => {
  const newCopy = JSON.parse(JSON.stringify(option));

  newCopy.name = `Copy of ${option.name}`;
  newCopy.id = `option-${Date.now()}`;
  emit("duplicateOption", newCopy);
};

const onChangeOptionName = () => {
  if (currentOption.value?.name === "") {
    currentOption.value.name = "New option";
  }
};

watch(showInput, async (newVal) => {
  if (newVal && isActive.value) {
    await nextTick();
    $inputRef.value?.focus();
  }
});
</script>
