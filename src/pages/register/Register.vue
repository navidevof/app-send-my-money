<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col w-11/12 mx-auto max-w-lg rounded-2xl bg-custom-black-2 pt-8 pb-9 drop-shadow-green"
  >
    <h2 class="text-white text-center text-xl font-semibold">
      Sign up. It's free!
    </h2>
    <aside class="w-11/12 mx-auto mt-5 flex flex-col gap-y-4 items-center">
      <input type="text" placeholder="Your name" v-model="register.username" />
      <input
        type="email"
        placeholder="Email Address"
        v-model="register.email"
      />
      <input
        type="password"
        placeholder="Choose a password"
        v-model="register.password"
      />
      <MainButton class="mt-5 text-white"> Sign up </MainButton>

      <router-link
        to="/login"
        class="text-center text-white/70 text-sm underline hover:text-white transition duration-200"
      >
        Already have an account? Sign in
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
