<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col w-11/12 gap-y-5 mx-auto max-w-lg rounded-2xl bg-custom-black-2 pt-8 pb-9 drop-shadow-green"
  >
    <header class="w-11/12 mx-auto text-center">
      <h2 class="text-white text-xl font-semibold">Choose a username</h2>
      <span class="text-white/70"> What do you want your link to be? </span>
    </header>
    <aside class="w-11/12 mx-auto flex flex-col gap-y-5">
      <label
        class="w-full bg-custom-black-3 text-white rounded-lg border border-white/30 px-4 py-3 flex items-center"
      >
        <span class="text-nowrap md:text-base text-sm text-white/70">
          sendmm.app/
        </span>
        <input
          type="text"
          placeholder="page-name"
          required
          class="input-without-style w-full bg-transparent font-light outline-none md:text-base text-sm text-white"
          maxlength="30"
          autofocus
          v-model="page.url"
          @input="onInput"
        />
        <div class="pl-2">
          <IconLoader
            v-if="isVerifying"
            class="size-5 min-w-5 animate-spin text-white/50"
          />
          <div v-else>
            <IconCircleClose
              v-show="!canContinue"
              class="size-5 min-w-5 text-custom-red-1"
            />
            <IconCircleCheck
              v-show="canContinue"
              class="size-5 min-w-5 text-custom-green-1"
            />
          </div>
        </div>
      </label>
      <BannerInfo text="You can change this at any time!" />
      <MainButton :disabled="!canContinue" class="text-white mt-4">
        Continue
      </MainButton>
      <router-link
        to="/register"
        class="text-center text-white/70 text-sm underline hover:text-white transition duration-200"
      >
        Go back
      </router-link>
    </aside>
  </form>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import BannerInfo from "@/components/ui/BannerInfo.vue";
import MainButton from "@/components/ui/MainButton.vue";
import IconLoader from "@/components/icons/IconLoader.vue";
import IconCircleCheck from "@/components/icons/IconCircleCheck.vue";
import { useRouter } from "vue-router";
import IconCircleClose from "@/components/icons/IconCircleClose.vue";
import { useEditor } from "@/store/editor";
import { storeToRefs } from "pinia";
import { useRegister } from "@/store/register";
import { verifyUrlPage } from "@/services/pages";

const editorStore = useEditor();
const registerStore = useRegister();
const { page } = storeToRefs(editorStore);
const { register } = storeToRefs(registerStore);

const router = useRouter();
const isVerifying = ref<boolean>(false);
const canContinue = ref<boolean>(false);

let typingTimeout: ReturnType<typeof setTimeout> | null = null;

const validateInput = (value: string): string => {
  const normalizedValue = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const sanitizedValue = normalizedValue
    .replace(/[^0-9a-zA-Z-]/g, "")
    .replaceAll(" ", "-")
    .trim()
    .toLocaleLowerCase();

  return sanitizedValue;
};

const onInput = (event: Event) => {
  const $input = event.target as HTMLInputElement;
  const newValue = validateInput($input.value);
  page.value.url = newValue;
  $input.value = newValue;

  if (page.value.url.trim() === "") {
    canContinue.value = false;
    return;
  }

  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

  isVerifying.value = true;
  canContinue.value = false;

  typingTimeout = setTimeout(() => {
    verifyUrl();
  }, 500);
};

const verifyUrl = async () => {
  isVerifying.value = true;
  canContinue.value = false;
  console.log("Verifying...");

  const res = await verifyUrlPage(page.value.url);

  if (res.error) {
    canContinue.value = false;
    isVerifying.value = false;
    return;
  }

  canContinue.value = true;
  isVerifying.value = false;
};

const handleSubmit = () => {
  router.push("/register/account/config-methods");
};

onMounted(async () => {
  if (register.value.username === "") {
    router.push("/register");
    return;
  }
  if (!register.value) return;
  page.value.url = validateInput(register.value.username);
  page.value.displayName = register.value.username.replaceAll(" ", "");
  await nextTick();

  verifyUrl();
});
</script>
