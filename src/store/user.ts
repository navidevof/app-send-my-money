import { defineStore } from "pinia";
import { ref } from "vue";

export const useUser = defineStore("user", () => {
  const user = ref<any>({
    username: "",
    email: "",
  });

  return { user };
});
