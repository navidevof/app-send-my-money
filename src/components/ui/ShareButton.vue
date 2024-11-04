<template>
  <MainButton
    @click="share"
    class="absolute !p-1 w-fit !bg-custom-black-3 border !size-9 overflow-clip border-white drop-shadow-green !rounded-lg -top-4 right-0 z-20"
  >
    <IconShare class="size-6 text-white" />
  </MainButton>
</template>

<script setup lang="ts">
import IconShare from "../icons/IconShare.vue";
import MainButton from "./MainButton.vue";

interface Props {
  url: string;
  open?: boolean;
}

const { url, open } = defineProps<Props>();

const share = async () => {
  const shareLink = `${window.location.protocol}//${window.location.host}${url}`;

  if (open) {
    window.open(shareLink, "_blank");
    return;
  }

  try {
    await navigator.share({
      title: "💸 Find all my payment methods in one place!",
      text: "Hi! Here’s a quick link to all my available payment methods. Feel free to choose the one that works best for you! 🌐💳",
      url: shareLink,
    });
  } catch (error) {
    console.error("Error sharing event:", error);
  }
};
</script>
