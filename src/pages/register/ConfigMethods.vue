<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col w-11/12 mx-auto max-w-lg rounded-2xl bg-custom-black-2 pt-8 pb-9 drop-shadow-green"
  >
    <h2
      class="text-white text-pretty w-11/12 mx-auto text-xl text-center font-semibold"
    >
      Select your payment methods
    </h2>
    <aside class="w-11/12 mx-auto mt-5 flex flex-col gap-y-4 items-center">
      <SelectMethod
        v-for="(method, idx) in page.methods"
        :key="method.id"
        @change="(option: any) => onChange({ selectedOption: option, methodIdx: idx })"
        :method="method"
      />
      <BannerInfo text="You can add or remove at any time!" class="mt-3" />
      <MainButton class="mt-4 text-white"> Continue </MainButton>

      <router-link
        to="/register/account/config-name"
        class="text-center text-white/70 text-sm underline hover:text-white transition duration-200"
      >
        Go back
      </router-link>
    </aside>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import MainButton from "@/components/ui/MainButton.vue";
import SelectMethod from "@/pages/register/SelectMethod.vue";
import BannerInfo from "@/components/ui/BannerInfo.vue";
import { usePage } from "@/store/page";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { createAccount } from "@/services/register";
import { useRegister } from "@/store/register";
import { useUIStore } from "@/store/ui";
import { MESSAGES } from "@/utils/messages";
import { signIn } from "@/services/login";

const uiStore = useUIStore();
const pageStore = usePage();
const registerStore = useRegister();

const { page } = storeToRefs(pageStore);
const { register } = storeToRefs(registerStore);

const router = useRouter();

const onChange = ({
  selectedOption,
  methodIdx,
}: {
  selectedOption: any;
  methodIdx: number;
}) => {
  if (!page.value) return;

  page.value.methods[methodIdx].icon = selectedOption.icon;
  page.value.methods[methodIdx].name = selectedOption.label;
  page.value.methods[methodIdx].template = selectedOption.value;
};

const handleSubmit = async () => {
  try {
    const res = await createAccount({
      username: register.value.username,
      email: register.value.email,
      password: register.value.password,
      page: page.value,
    });

    if (res.error || !res.data) {
      uiStore.showAlert("error", res.message);
      return;
    }

    const data = res.data;

    page.value = data;
    await signIn(register.value.email, register.value.password);
    registerStore.resetStore();

    router.push("/register/account/preview");
  } catch (error) {
    uiStore.showAlert("error", MESSAGES.ERROR_DEFAULT);
    console.log({ error });
  }
};

onMounted(() => {
  if (page.value.url === "") {
    router.push("/register");
    return;
  }
});
</script>
