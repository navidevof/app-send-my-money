<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col w-11/12 mx-auto max-w-lg rounded-2xl pt-8 pb-9 drop-shadow-green bg-custom-black-2"
  >
    <h2
      class="text-white text-pretty w-11/12 mx-auto text-xl text-center font-semibold"
    >
      Selecciona tus métodos de pago
    </h2>
    <aside
      class="w-11/12 mx-auto mt-5 flex flex-col gap-y-4 items-center"
      v-auto-animate="{ duration: 200 }"
    >
      <SelectMethod
        v-for="(method, idx) in page.methods"
        :key="method.id"
        @change="(option: any) => onChange({ selectedOption: option, methodIdx: idx })"
        :method="method"
        @delete="() => onDelete(idx)"
      />
      <BannerInfo
        text="Puedes agregar o eliminar en cualquier momento"
        class="mt-3"
      />
      <MainButton
        type="button"
        v-if="page.methods.length < 3"
        @click="onAdd"
        class="text-white"
      >
        <IconPlus class="size-5" />
        Agregar
      </MainButton>
      <MainButton class="mt-4 text-white"> Continuar </MainButton>

      <router-link
        to="/register/account/config-name"
        class="text-center text-white/70 text-sm underline hover:text-white transition duration-200"
      >
        Volver
      </router-link>
    </aside>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import MainButton from "@/components/ui/MainButton.vue";
import SelectMethod from "@/pages/register/SelectMethod.vue";
import BannerInfo from "@/components/ui/BannerInfo.vue";
import { useEditor } from "@/store/editor";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { createAccount } from "@/services/register";
import { useRegister } from "@/store/register";
import { useUIStore } from "@/store/ui";
import { MESSAGES } from "@/utils/messages";
import { signIn } from "@/services/login";
import { newMethod } from "@/mocks/editor";
import IconPlus from "@/components/icons/IconPlus.vue";
import { useUser } from "@/store/user";

const uiStore = useUIStore();
const editorStore = useEditor();
const registerStore = useRegister();
const userStore = useUser();

const { isLoading } = storeToRefs(uiStore);
const { page } = storeToRefs(editorStore);
const { register } = storeToRefs(registerStore);
const { finishRegister } = storeToRefs(userStore);

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

const onDelete = (idx: number) => {
  page.value.methods.splice(idx, 1);
};

const onAdd = () => {
  page.value.methods.push(newMethod());
};

const handleSubmit = async () => {
  try {
    finishRegister.value = false;
    isLoading.value = true;
    const res = await createAccount({
      username: register.value.username,
      email: register.value.email,
      password: register.value.password,
      page: page.value,
      orderId: register.value.orderId,
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
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (page.value.url === "") {
    router.push("/register");
    return;
  }
});
</script>
