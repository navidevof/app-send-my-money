<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col w-11/12 mx-auto max-w-lg rounded-2xl pt-8 pb-9 drop-shadow-green bg-custom-black-2"
  >
    <h2 class="text-white text-center text-xl font-semibold">
      Regístrate ¡Es gratis!
    </h2>
    <aside class="w-11/12 mx-auto mt-5 flex flex-col gap-y-4 items-center">
      <input
        type="text"
        placeholder="Escribe tu nombre"
        v-model="register.username"
        required
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        v-model="register.email"
        required
      />
      <input
        type="password"
        placeholder="Ingresa tu contraseña"
        v-model="register.password"
        minlength="8"
        title="The password must be at least 6 characters long, include an uppercase letter, a lowercase letter, and a number."
        required
      />
      <MainButton class="mt-5 text-white"> Continuar </MainButton>

      <router-link
        to="/login"
        class="text-center text-white/70 text-sm underline hover:text-white transition duration-200"
      >
        ¿Ya tienes una cuenta? ingresa aquí
      </router-link>
    </aside>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import MainButton from "@/components/ui/MainButton.vue";
import { storeToRefs } from "pinia";
import { useRegister } from "@/store/register";

const registerStore = useRegister();
const { register } = storeToRefs(registerStore);

const router = useRouter();

const handleSubmit = () => {
  router.push("/register/account/config-name");
};
</script>
