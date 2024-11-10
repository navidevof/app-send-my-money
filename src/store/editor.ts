import { TTab } from "@/interfaces/page";
import { IMethod, IOption, IPage } from "@/interfaces/page";
import { ITheme } from "@/interfaces/theme";
import { newMethod } from "@/mocks/editor";
import { INITIAL_PAGE } from "@/mocks/page";
import { THEMES } from "@/utils/themes";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useEditor = defineStore(
  "editor",
  () => {
    const TABS = ref<TTab[]>(["Methods", "Appearance"]);
    const page = ref<IPage>(JSON.parse(JSON.stringify(INITIAL_PAGE)));
    const showModalPremium = ref<boolean>(false);

    const pageConfigCurrentTab = ref<string>(
      JSON.parse(JSON.stringify(TABS.value[0]))
    );
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
      if (!page.value.plan?.isActive && page.value.methods.length >= 3)
        return (showModalPremium.value = true);
      page.value.methods.push(newMethod());
    };

    const initPage = () => {
      unsavedChanges.value = false;
      filePhoto.value = undefined;
      currentMethod.value = undefined;
      currentOption.value = undefined;
      pageConfigCurrentTab.value = TABS.value[0];
    };

    const resetStore = () => {
      initPage();
      filePhoto.value = undefined;
      unsavedChanges.value = false;
      showModalPremium.value = false;
      page.value = JSON.parse(JSON.stringify(INITIAL_PAGE));
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
      showModalPremium,
      initPage,
      onAddNewMethod,
      loadTheme,
      resetStore,
    };
  },
  { persist: true }
);
