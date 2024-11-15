<template>
  <div
    class="flex flex-col flex-1 w-full rounded-lg border border-white/50 aspect-[592/469] lg:aspect-[592/369] min-h-72"
  >
    <div
      class="py-3 px-5 flex justify-between items-center border-white/50 border-b w-full"
    >
      <slot name="header"></slot>
    </div>
    <div
      class="p-3 flex flex-col gap-y-3 flex-1"
      v-auto-animate="{ duration: 200 }"
    >
      <div
        v-if="!page?.plan?.isActive && isPremium"
        class="flex flex-col justify-center my-auto items-center w-9/12 mx-auto gap-y-2"
      >
        <IconTimeline class="size-8 text-white" />
        <p class="text-white text-center text-sm">
          Actualiza a MLDP Pro para ver estadísticas
        </p>
        <MainButton
          @click="showModalPremium = true"
          class="!w-fit text-xs text-white"
        >
          Upgrade to Pro
        </MainButton>
      </div>
      <slot v-else-if="showContent" name="content"></slot>
      <slot v-else name="message-empty"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditor } from "@/store/editor";
import { storeToRefs } from "pinia";
import IconTimeline from "@/components/icons/IconTimeline.vue";
import MainButton from "../ui/MainButton.vue";

interface Props {
  showContent?: boolean;
  isPremium?: boolean;
}

withDefaults(defineProps<Props>(), {
  isPremium: true,
});

const editorStore = useEditor();
const { page, showModalPremium } = storeToRefs(editorStore);
</script>
