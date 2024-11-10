<template>
  <div
    class="bg-custom-black-3 flex md:flex-row flex-col gap-y-4 justify-between items-center drop-shadow-green border text-sm md:text-base border-white/50 rounded-2xl px-4 py-4 md:py-2 text-white"
  >
    <p class="w-full md:w-fit md:text-start text-center">
      <strong class="md:inline-block block">🔥 Your SMM is ready in: </strong
      >{{ " " }}
      <a
        class="underline font-light transition duration-200 hover:text-custom-green-1"
        :href="urlPage"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ url }}
      </a>
    </p>
    <MainButton
      :disabled="isCopied"
      @click="copyToClipboard"
      class="w-full md:!w-fit"
    >
      {{ isCopied ? "Copied! 🎉" : "Copy URL" }}
    </MainButton>
  </div>
</template>

<script setup lang="ts">
import MainButton from "@/components/ui/MainButton.vue";
import { computed, ref } from "vue";

interface Props {
  url: string;
}

const { url } = defineProps<Props>();
const isCopied = ref<boolean>(false);

const urlPage = computed(() => {
  return `${window.location.protocol}//${window.location.host}/page/${url}`;
});

const copyToClipboard = () => {
  isCopied.value = true;
  navigator.clipboard.writeText(urlPage.value);
  setTimeout(() => {
    isCopied.value = false;
  }, 1000);
};
</script>
