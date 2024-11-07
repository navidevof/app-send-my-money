<template>
  <aside
    class="flex flex-col transition fixed top-0 left-0 lg:translate-y-0 lg:scale-100 h-[100dvh] duration-300 py-10 px-5 lg:px-6 lg:py-7 lg:h-full lg:opacity-100 gap-y-6 lg:max-w-lg lg:max-h-[calc(100vh-180px)] overflow-y-auto xl:max-w-full overflow-hidden mx-auto w-full lg:rounded-3xl lg:border bg-custom-black-2 border-white/50 lg:drop-shadow-green lg:z-10 lg:relative"
    :class="
      currentMethod
        ? 'opacity-100 z-20 translate-y-0 scale-100'
        : 'opacity-0 z-0 translate-y-full scale-50'
    "
  >
    <header class="flex items-center justify-between gap-x-1 w-full">
      <h3 class="text-white text-lg xl:text-xl font-semibold">Settings</h3>
      <MainButton
        class="!w-fit !p-1 !rounded-full drop-shadow-white lg:hidden"
        @click="closeModal"
      >
        <IconClose class="size-6 text-white" />
      </MainButton>
    </header>
    <div
      class="h-px min-h-px bg-white/50 drop-shadow-green w-full rounded-full"
    />
    <aside class="flex flex-col gap-y-8" v-if="currentMethod">
      <label class="flex flex-col gap-y-1">
        <h4 class="md:text-lg font-medium text-white">Method</h4>
        <SelectMethod />
      </label>
      <DetailOption />
    </aside>
    <p
      v-else
      class="w-full font-light text-pretty p-5 text-center rounded-lg bg-custom-black-3 text-white"
    >
      Select a payment method to update 🤞
    </p>
  </aside>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePage } from "../../../store/page";

import SelectMethod from "./SelectMethod.vue";
import DetailOption from "./DetailOption.vue";
import MainButton from "@/components/ui/MainButton.vue";
import IconClose from "@/components/icons/IconClose.vue";

const pageStore = usePage();
const { currentMethod } = storeToRefs(pageStore);

const closeModal = () => {
  if (!currentMethod.value) return;

  currentMethod.value = undefined;
};
</script>
