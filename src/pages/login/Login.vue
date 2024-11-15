<template>
  <main class="flex flex-col gap-y-7 py-10">
    <router-link
      to="/"
      class="flex items-center w-fit mx-auto justify-center gap-x-2"
    >
      <img
        src="@/assets/logo.webp"
        alt="Logo de Mis links de pago"
        width="50"
        height="50"
        loading="eager"
      />
      <h1 class="text-white text-center text-3xl font-bold">
        <span class="hidden md:block">Mis links de pago</span>
        <span class="md:hidden">MLDP</span>
      </h1>
    </router-link>
    <aside class="w-full register-container">
      <form
        @submit.prevent="handleSubmit"
        class="flex flex-col w-11/12 mx-auto max-w-lg rounded-2xl pt-8 pb-9 drop-shadow-green bg-custom-black-2"
      >
        <h2 class="text-white text-center text-xl font-semibold">
          Ingresa a tu cuenta
        </h2>
        <aside class="w-11/12 mx-auto mt-5 flex flex-col gap-y-4 items-center">
          <input
            type="email"
            placeholder="Correo"
            v-model="data.email"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            v-model="data.password"
            required
          />
          <MainButton class="mt-4 text-white"> Ingresar </MainButton>
          <router-link
            to="/recover-password"
            class="text-end w-full text-white/70 -mt-2 text-sm hover:underline font-medium hover:text-white transition duration-200"
          >
            ¿Olvidaste tu contraseña?
          </router-link>

          <router-link
            to="/register"
            class="text-center text-white/70 text-sm underline mt-2 hover:text-white transition duration-200"
          >
            ¿Eres nuevo en Mis links de pago? Regístrate
          </router-link>
        </aside>
      </form>
    </aside>
  </main>
</template>

<script setup lang="ts">
import MainButton from "@/components/ui/MainButton.vue";
import { signIn } from "@/services/login";
import { useUIStore } from "@/store/ui";
import { MESSAGES } from "@/utils/messages";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const uiStore = useUIStore();

const data = ref({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  try {
    const res = await signIn(data.value.email, data.value.password);
    if (res.error) {
      uiStore.showAlert("error", res.message);
      return;
    }

    router.push("/");
  } catch (error) {
    uiStore.showAlert("error", MESSAGES.ERROR_DEFAULT);
    console.log({ error });
  }
};
</script>

<style>
.register-container input:not(.input-without-style) {
  @apply w-full bg-custom-black-3 text-white rounded-lg border border-white/30 px-4 py-3;
}
</style>
