<template>
  <aside
    v-bind="$attrs"
    class="flex flex-col lg:px-6 lg:py-7 gap-y-8 lg:max-w-sm h-[100dvh] lg:h-full lg:scale-100 fixed lg:translate-y-0 lg:opacity-100 lg:z-10 lg:relative transition duration-300 overflow-x-hidden mx-auto lg:max-h-[calc(100vh-180px)] overflow-y-auto w-full lg:rounded-3xl lg:border lg: border-white/50 lg:drop-shadow-green"
    :class="
      showModalPreview
        ? 'top-0 z-30 left-0 scale-100 translate-y-0 opacity-100 px-10 pt-14 pb-10'
        : 'z-0 opacity-0 scale-50 translate-y-full'
    "
    :style="{ ...page.styles.page }"
  >
    <Hero />
    <Methods :showModalDetail="() => (showModalDetail = true)" />
    <FooterPage v-show="!page.plan?.isActive" showHiddenButton />
  </aside>

  <MainButton
    v-show="!showModalPreview"
    @click="showModalPreview = !showModalPreview"
    class="fixed border-white border !w-fit text-nowrap px-8 bottom-10 left-1/2 -translate-x-1/2 lg:hidden z-20"
  >
    <IconEye class="size-6 text-white" />
    <strong class="text-white text-lg">Vista previa</strong>
  </MainButton>

  <MainButton
    v-show="showModalPreview"
    @click="showModalPreview = !showModalPreview"
    class="rounded-full !w-fit aspect-square !p-3 drop-shadow-green border lg:hidden fixed bottom-20 left-1/2 -translate-x-1/2 border-white z-40"
  >
    <IconClose class="size-6 text-white" />
  </MainButton>

  <Modal v-show="showModalDetail" @close="showModalDetail = false" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useEditor } from "../../../store/editor";

import IconEye from "@/components/icons/IconEye.vue";
import MainButton from "@/components/ui/MainButton.vue";
import IconClose from "@/components/icons/IconClose.vue";
import Hero from "./Hero.vue";
import Methods from "./Methods.vue";
import FooterPage from "@/components/common/FooterPage.vue";
import Modal from "./Modal.vue";

defineOptions({
  inheritAttrs: false,
});

const showModalPreview = ref<boolean>(false);
const showModalDetail = ref<boolean>(false);

const editorStore = useEditor();
const { page } = storeToRefs(editorStore);
</script>
