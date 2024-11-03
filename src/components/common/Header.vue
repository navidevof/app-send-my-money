<template>
  <header class="py-5 flex border-b border-b-white/50">
    <nav
      class="flex justify-between items-center max-w-screen-2xl mx-auto w-11/12"
    >
      <router-link class="flex items-center gap-2 md:gap-x-3" to="/">
        <img
          src="@/assets/logo.webp"
          alt="Logo Send My Money"
          class="aspect-square w-[50px] h-[50px]"
          width="50"
          height="50"
          loading="eager"
        />
        <h1 class="text-white text-2xl font-bold drop-shadow-white">
          <span class="hidden md:block">Send My Money</span>
          <span class="md:hidden">SMM</span>
        </h1>
      </router-link>
      <div class="flex items-center gap-x-3 w-fit relative">
        <button
          class="w-[45px] h-[45px] rounded-full overflow-hidden border-2 border-white/80"
          name="avatar"
          type="button"
          @click="showDropdown = !showDropdown"
        >
          <div class="size-full bg-custom-green-1 grid place-items-center">
            <h2 class="text-white font-semibold text-lg">N</h2>
          </div>
        </button>

        <div
          v-show="showDropdown"
          class="absolute z-30 top-full gap-y-3 min-w-48 text-start right-0 mt-2 rounded-2xl py-3 flex flex-col bg-custom-black-2 drop-shadow-green border border-white/70"
        >
          <div class="w-10/12 mx-auto flex flex-col gap-y-2 text-white">
            <span>Account</span>
            <span>Settings</span>
            <span>Upgrade to Pro</span>
          </div>
          <div class="h-px bg-white/70 w-full" />
          <button
            @click="onSignOut"
            class="w-9/12 mx-auto flex items-center gap-x-1"
          >
            <IconSignOut class="size-5 text-custom-red-1" />
            <span class="text-start text-custom-red-1 font-semibold">
              Sing out
            </span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import IconSignOut from "../icons/IconSignOut.vue";
import { signOut } from "@/services/login";
import { useUIStore } from "@/store/ui";
import { useRouter } from "vue-router";
import { MESSAGES } from "@/utils/messages";

const router = useRouter();
const uiStore = useUIStore();

const showDropdown = ref<boolean>(false);

const onSignOut = async () => {
  try {
    const res = await signOut();
    if (res.error) {
      uiStore.showAlert("error", res.message);
      return;
    }

    router.push("/login");
  } catch (error) {
    uiStore.showAlert("error", MESSAGES.ERROR_DEFAULT);
    console.log({ error });
  }
};
</script>
