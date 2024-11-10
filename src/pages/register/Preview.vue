<template>
  <aside
    class="flex flex-col gap-y-8 w-11/12 mx-auto bg-custom-black-2 drop-shadow-white rounded-2xl px-4 py-8 md:p-8 max-w-screen-sm"
  >
    <header
      class="flex flex-col gap-y-1 justify-center items-center relative text-white"
    >
      <h2 class="text-white text-xl font-semibold">Your SMM is ready!</h2>
      <span class="text-white/70">It's time to share it with the world</span>
      <span class="text-sm">sendmm.app/cantillo0422</span>
    </header>
    <div
      class="flex flex-col gap-y-8 max-w-lg rounded-2xl mx-auto w-full bg-custom-black-2 pt-8 pb-9 drop-shadow-green text-white px-5 md:p-10"
    >
      <header
        class="flex flex-col gap-y-2 justify-center items-center relative"
      >
        <MainButton
          class="absolute !p-1 w-fit !bg-custom-black-3 border !size-9 overflow-clip border-white drop-shadow-green !rounded-lg -top-4 right-0 z-20"
        >
          <IconShare class="size-6 text-white" />
        </MainButton>
        <div
          class="rounded-full border-2 size-28 overflow-hidden border-white drop-shadow-black grid place-items-center"
        >
          <div
            class="size-full aspect-square place-items-center grid bg-custom-green-1"
          >
            <strong class="uppercase font-semibold text-5xl text-white">
              {{ page.displayName.charAt(0) }}
            </strong>
          </div>
        </div>
        <div class="flex justify-center items-center gap-x-1 w-11/12 mx-auto">
          <h1 class="font-bold text-xl md:text-2xl truncate w-fit max-w-[95%]">
            {{ page.displayName }}
          </h1>
        </div>
      </header>
      <div class="grow flex flex-col gap-y-4 w-full">
        <div
          class="rounded-2xl flex items-center justify-between py-[10px] bg-custom-black-3 px-5 gap-x-3 transition duration-200 w-full"
          v-for="(method, idx) in page.methods"
          :key="idx"
        >
          <ImageBank :icon="method.icon" />
          <h4
            class="text-white xl:text-lg line-clamp-1 w-full text-start overflow-hidden flex-1"
          >
            {{ method.name }}
          </h4>
        </div>
      </div>
      <footer class="w-full flex flex-col items-center gap-y-3">
        <a
          href="#"
          target="_blank"
          rel="noreferrer noopener"
          class="flex items-center justify-center mx-auto gap-x-1"
        >
          <h2 class="font-bold text-2xl">SMM</h2>
          <img
            src="@/assets/logo.webp"
            alt="SMM"
            class="aspect-square size-9"
            width="50"
            height="50"
          />
        </a>
      </footer>
    </div>
    <router-link to="/" class="mt-auto">
      <MainButton class="text-white max-w-md mx-auto"> Go to edit </MainButton>
    </router-link>
  </aside>
</template>

<script setup lang="ts">
import JSConfetti from "js-confetti";

import IconShare from "@/components/icons/IconShare.vue";
import ImageBank from "@/components/ui/ImageBank.vue";
import MainButton from "@/components/ui/MainButton.vue";
import { onMounted } from "vue";
import { useEditor } from "@/store/editor";
import { storeToRefs } from "pinia";
import router from "@/router";
import { useUser } from "@/store/user";

const editorStore = useEditor();
const userStore = useUser();
const { page } = storeToRefs(editorStore);
const { finishRegister } = storeToRefs(userStore);

onMounted(() => {
  if (!page.value) {
    router.push("/register");
    return;
  }

  if (finishRegister.value) return router.push("/");

  const confetti = new JSConfetti();
  confetti.addConfetti();
  finishRegister.value = true;
});
</script>
