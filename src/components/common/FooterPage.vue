<template>
  <footer class="w-full flex flex-col items-center gap-y-3 sticky bottom-5">
    <a href="/" target="_blank" rel="noreferrer noopener">
      <MainButton
        class="!w-fit mx-auto opacity-50 hover:opacity-100 group hover:!bg-custom-green-1 drop-shadow-green border border-white/50"
      >
        <img
          src="@/assets/logo.webp"
          alt="SMM"
          class="aspect-square size-9"
          width="50"
          height="50"
        />
        <span class="text-white text-sm">Want your own payment page?</span>
      </MainButton>
    </a>
    <button
      @click="showModalPremium = true"
      v-if="showHiddenButton"
      class="text-sm font-medium"
    >
      Hide SMM logo <IconPadlock class="size-5 inline-block" />
    </button>
  </footer>
</template>

<script setup lang="ts">
import { useEditor } from "@/store/editor";
import { storeToRefs } from "pinia";
import MainButton from "@/components/ui/MainButton.vue";
import IconPadlock from "../icons/IconPadlock.vue";

interface Props {
  showHiddenButton?: boolean;
}

defineProps<Props>();

const editorStore = useEditor();
const { showModalPremium } = storeToRefs(editorStore);
</script>
