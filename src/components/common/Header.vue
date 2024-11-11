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
          <span class="hidden md:block" translate="no">Send My Money</span>
          <span class="md:hidden">SMM</span>
        </h1>
      </router-link>
      <div
        class="flex items-center gap-x-3 w-fit relative"
        @click.self="showDropdown = false"
      >
        <a
          href="https://wa.me/573241457544"
          target="_blank"
          rel="noopener noreferrer"
          class="text-white px-4 py-2 border border-white/50 rounded-lg md:block hidden hover:bg-custom-black-3 transition duration-200"
          v-if="page.plan?.isActive"
        >
          Feedback
        </a>
        <button
          class="w-[45px] h-[45px] rounded-full overflow-hidden border-2 border-white/80"
          name="avatar"
          type="button"
          @click.stop="toggleDropdown"
        >
          <div v-if="page.photo != ''">
            <img
              :src="page.photo"
              alt="Profile photo"
              class="object-cover object-center size-full"
              width="50"
              height="50"
            />
          </div>
          <div
            v-else
            class="size-full bg-custom-green-1 grid place-items-center"
          >
            <h2 class="text-white font-semibold text-lg" translate="no">N</h2>
          </div>
        </button>

        <div
          v-show="showDropdown"
          id="menu-header-dropdown"
          class="absolute z-30 top-full gap-y-3 min-w-48 w-fit text-start right-0 mt-2 rounded-2xl py-3 flex flex-col bg-custom-black-2 drop-shadow-green border border-white/50"
        >
          <div class="w-10/12 mx-auto flex flex-col gap-y-2 text-white">
            <!-- <button
              @click="showDropdown = false"
              class="text-nowrap text-sm flex items-center gap-2"
            >
              <span class="w-4">👤</span> Account
            </button> -->
            <router-link
              to="/"
              class="text-nowrap text-sm flex items-center gap-2"
            >
              <span class="w-4">🎨</span> Editor
            </router-link>
            <router-link
              to="/stats"
              class="text-nowrap text-sm flex items-center gap-2"
            >
              <span class="w-4">📊</span> Stats
            </router-link>
            <a
              href="https://wa.me/573241457544"
              class="text-nowrap text-sm flex items-center gap-2 md:hidden"
              v-if="page.plan?.isActive"
            >
              <span class="w-4">📝</span> Feedback
            </a>
            <button
              v-if="!page.plan?.isActive"
              @click="showModalPremium = true"
              class="text-nowrap text-sm flex items-center gap-2"
            >
              <span class="w-4">✨</span> Upgrade to Pro
            </button>
          </div>
          <div class="h-px bg-white/70 w-full" />
          <button
            @click="onSignOut"
            class="w-10/12 mx-auto flex items-center gap-x-1"
          >
            <IconSignOut class="size-5 text-custom-red-1" />
            <span class="text-start text-custom-red-1 font-semibold text-sm">
              Sign out
            </span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import IconSignOut from "../icons/IconSignOut.vue";
import { signOut } from "@/services/login";
import { useUIStore } from "@/store/ui";
import { useRouter } from "vue-router";
import { MESSAGES } from "@/utils/messages";
import { useEditor } from "@/store/editor";
import { storeToRefs } from "pinia";

const router = useRouter();
const uiStore = useUIStore();
const editorStore = useEditor();
const { page, showModalPremium } = storeToRefs(editorStore);

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const onSignOut = async () => {
  try {
    const res = await signOut();
    if (res.error) {
      uiStore.showAlert("error", res.message);
      return;
    }

    editorStore.resetStore();
    router.push("/login");
  } catch (error) {
    uiStore.showAlert("error", MESSAGES.ERROR_DEFAULT);
    console.log({ error });
  }
};

const handleClickOutside = () => {
  if (showDropdown.value) showDropdown.value = false;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
