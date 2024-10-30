<template>
  <header class="flex flex-col gap-y-2 justify-center items-center relative">
    <MainButton
      @click="share"
      class="absolute !p-1 w-fit !bg-custom-black-3 border !size-9 overflow-clip border-white drop-shadow-green !rounded-lg -top-4 right-0 z-20"
    >
      <IconShare class="size-6 text-white" />
    </MainButton>
    <div
      class="rounded-full border-2 size-28 overflow-hidden border-white drop-shadow-black grid place-items-center"
    >
      <img
        v-if="page.photo !== ''"
        :src="page.photo"
        class="object-cover object-center size-full absolute"
        alt="Profile photo"
        loading="eager"
        decoding="async"
        fetchpriority="high"
        referrerpolicy="no-referrer"
        width="100%"
        height="100%"
      />
      <div
        v-else
        class="size-full aspect-square place-items-center grid bg-custom-green-1"
      >
        <strong class="uppercase font-semibold text-5xl text-white">{{
          page.displayName.charAt(0)
        }}</strong>
      </div>
    </div>
    <div class="flex justify-center items-center gap-x-1 w-11/12 mx-auto">
      <h1 class="font-bold text-xl md:text-2xl truncate w-fit max-w-[95%]">
        {{ page.displayName }}
      </h1>
      <IconVerify class="size-6 min-w-6" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditor } from "@/components/editor/store";

import MainButton from "@/components/ui/MainButton.vue";
import IconShare from "@/components/icons/IconShare.vue";
import IconVerify from "@/components/icons/IconVerify.vue";

const editorStore = useEditor();
const { page } = storeToRefs(editorStore);

const shareLink = `${window.location.protocol}//${window.location.host}`;

const share = async () => {
  try {
    await navigator.share({
      title: "💸 Find all my payment methods in one place!",
      text: "Hi! Here’s a quick link to all my available payment methods. Feel free to choose the one that works best for you! 🌐💳",
      url: shareLink,
    });
  } catch (error) {
    console.error("Error sharing event:", error);
    alert("Your browser does not support sharing functionality.");
  }
};
</script>
