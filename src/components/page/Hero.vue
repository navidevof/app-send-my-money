<template>
  <header class="flex flex-col gap-y-2 justify-center items-center relative">
    <ShareButton v-show="url" :url="`/page/${url}`" />
    <div
      class="rounded-full border-2 size-28 overflow-hidden border-white drop-shadow-black grid place-items-center"
    >
      <img
        v-if="photo !== ''"
        :src="photo"
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
          displayName?.charAt(0)
        }}</strong>
      </div>
    </div>
    <div class="flex justify-center items-center gap-x-1 w-11/12 mx-auto">
      <h1 class="font-bold text-xl md:text-2xl truncate w-fit max-w-[95%]">
        {{ displayName }}
      </h1>
      <!-- <IconVerify class="size-6 min-w-6" /> -->
    </div>
  </header>
</template>

<script setup lang="ts">
import ShareButton from "../ui/ShareButton.vue";

interface Props {
  photo?: string;
  displayName?: string;
  url?: string;
}

const { photo, displayName } = defineProps<Props>();
</script>
