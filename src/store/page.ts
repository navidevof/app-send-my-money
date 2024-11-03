import { TTab } from "@/interfaces/page";
import { IMethod, IOption, IPage } from "@/interfaces/page";
import { ITheme } from "@/interfaces/theme";
import { newMethod } from "@/mocks/editor";
import { THEMES } from "@/utils/themes";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const usePage = defineStore(
  "page",
  () => {
    const TABS = ref<TTab[]>(["Methods", "Appearance"]);
    const page = ref<IPage>({
      uid: "",
      pageId: "",
      url: "",
      displayName: "",
      photo: "",
      createdAt: 0,
      updatedAt: 0,
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
          id: "method-1",
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
        {
          id: "method-2",
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
        {
          id: "method-3",
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
    const currentTheme = ref<ITheme>(JSON.parse(JSON.stringify(THEMES[0])));
    const filePhoto = ref<File>();
    const unsavedChanges = ref<boolean>(false);

    const loadTheme = () => {
      page.value.styles.page = currentTheme.value.styles.page;
      page.value.styles.method = currentTheme.value.styles.method;
    };

    const onAddNewMethod = () => {
      page.value.methods.push(newMethod());
    };

    const initPage = () => {
      unsavedChanges.value = false;
      filePhoto.value = undefined;
      currentMethod.value = undefined;
      currentOption.value = undefined;
      pageConfigCurrentTab.value = TABS.value[0];
    };

    watch(
      () => page.value,
      () => {
        unsavedChanges.value = true;
      },
      { deep: true }
    );

    return {
      page,
      currentMethod,
      TABS,
      pageConfigCurrentTab,
      currentOption,
      currentTheme,
      filePhoto,
      unsavedChanges,
      initPage,
      onAddNewMethod,
      loadTheme,
    };
  },
  { persist: true }
);
