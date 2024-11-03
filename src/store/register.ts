import { defineStore } from "pinia";
import { ref } from "vue";

export const useRegister = defineStore("register", () => {
  const register = ref<any>({
    username: "",
    email: "",
    password: "",
  });

  const resetStore = () => {
    register.value = {
      username: "",
      email: "",
      password: "",
    };
  };

  return { register, resetStore };
});