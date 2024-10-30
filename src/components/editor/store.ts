import { TTab } from "@/interfaces/editor";
import { IMethod, IOption, IPage } from "@/interfaces/editor";
import { ITheme } from "@/interfaces/theme";
import { newMethod } from "@/mocks/editor";
import { THEMES } from "@/utils/themes";
import { defineStore } from "pinia";
import { onMounted, ref, watch } from "vue";

export const useEditor = defineStore("editor", () => {
  const TABS = ref<TTab[]>(["Methods", "Appearance"]);
  const page = ref<IPage>({
    displayName: "Display name",
    photo: "",
    styles: {
      page: {
        background: "#000000",
        color: "#ffffff",
      },
      method: {
        background: "#000000",
        color: "#ffffff",
        borderRadius: "0.5rem",
      },
    },
    methods: [
      {
        id: "new-method",
        template: "new-method",
        icon: "",
        name: "New method",
        options: [
          {
            id: "new-option",
            name: "New option",
            haveQr: false,
            qrUrl: "",
            fields: [],
          },
        ],
      },
    ],
  });

  const pageConfigCurrentTab = ref<string>(TABS.value[0]);
  const currentMethod = ref<IMethod>();
  const currentOption = ref<IOption>();
  const currentTheme = ref<ITheme>(THEMES[0]);

  const loadTheme = () => {
    if (!page.value) return;

    page.value.styles.page = currentTheme.value.styles.page;
    page.value.styles.method = currentTheme.value.styles.method;
  };

  const onAddNewMethod = () => {
    page.value.methods.push(newMethod());
  };

  onMounted(() => {
    loadTheme();
  });

  watch(currentTheme, () => {
    loadTheme();
  });

  return {
    page,
    currentMethod,
    TABS,
    pageConfigCurrentTab,
    currentOption,
    currentTheme,
    onAddNewMethod,
  };
});
