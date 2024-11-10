<template>
  <section class="flex flex-col gap-y-5 w-11/12 max-w-screen-2xl mx-auto py-10">
    <GoToPage :url="page.url" />
    <aside
      class="gap-x-10 xl:gap-x-20 justify-center h-fit w-full grid grid-cols-1 lg:grid-cols-3 relative"
    >
      <PageConfig class="min-h-[50vh]" />
      <Preview class="min-h-[50vh]" />
      <Settings class="min-h-[50vh]" />
    </aside>
  </section>
  <ModalPremium />
</template>

<script setup lang="ts">
import GoToPage from "@/components/editor/common/GoToPage.vue";
import ModalPremium from "@/components/editor/common/ModalPremium.vue";
import PageConfig from "@/components/editor/pageConfig/PageConfig.vue";
import Preview from "@/components/editor/preview/Preview.vue";
import Settings from "@/components/editor/settings/Settings.vue";
import { getPage } from "@/services/pages";
import { useEditor } from "@/store/editor";
import { useUIStore } from "@/store/ui";
import { MESSAGES } from "@/utils/messages";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted } from "vue";

const uiStore = useUIStore();
const editorStore = useEditor();
const { page, unsavedChanges } = storeToRefs(editorStore);
const { isLoading } = storeToRefs(uiStore);

const warnBeforeUnload = (e: BeforeUnloadEvent) => {
  if (unsavedChanges.value) {
    e.preventDefault();
  }
};

onMounted(async () => {
  if (!page.value) return;
  try {
    isLoading.value = true;
    const res = await getPage(page.value.url != "" ? page.value.url : "first");
    if (res.error || !res.data) {
      uiStore.showAlert("error", res.message);
      return;
    }

    page.value = res.data;
    editorStore.initPage();
  } catch (error) {
    uiStore.showAlert("error", MESSAGES.ERROR_DEFAULT);
    console.log({ error });
  } finally {
    isLoading.value = false;
  }
  window.addEventListener("beforeunload", warnBeforeUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", warnBeforeUnload);
});
</script>
