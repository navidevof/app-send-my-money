<template>
  <header class="flex flex-col gap-y-2 justify-center items-center relative">
    <ShareButton
      v-show="page.url"
      :url="`/page/${page.url}`"
      :message="page.messageToShare"
    />
    <div
      class="rounded-full border-2 size-28 overflow-hidden border-white drop-shadow-black grid place-items-center"
    >
      <img
        v-if="page.photo !== ''"
        :src="page.photo"
        class="object-cover object-center size-full absolute"
        alt="Profile photo"
        loading="eager"
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
      <h1
        class="font-bold text-xl md:text-2xl truncate w-fit max-w-[95%]"
        translate="no"
      >
        {{ page.displayName }}
      </h1>
      <!-- <IconVerify class="size-6 min-w-6" /> -->
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditor } from "@/store/editor";

import ShareButton from "@/components/ui/ShareButton.vue";
// import IconVerify from "@/components/icons/IconVerify.vue";

const editorStore = useEditor();
const { page } = storeToRefs(editorStore);
</script>
