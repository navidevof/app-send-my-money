import { defineStore } from "pinia";
import { ref } from "vue";

export const useUser = defineStore(
  "user",
  () => {
    const finishRegister = ref<boolean>(false);

    const user = ref<any>({
      username: "",
      email: "",
    });

    return { user, finishRegister };
  },
  {
    persist: true,
  }
);
