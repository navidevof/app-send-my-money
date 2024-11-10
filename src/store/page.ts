import { defineStore } from "pinia";
import { ref } from "vue";

export const usePage = defineStore(
  "page",
  () => {
    const canAddCopyOptionStat = ref<boolean>(true);

    return { canAddCopyOptionStat };
  },
  {
    persist: true,
  }
);
