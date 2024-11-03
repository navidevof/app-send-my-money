<template>
  <section
    class="mx-auto gap-x-10 xl:gap-x-20 justify-center h-fit w-11/12 grid grid-cols-1 lg:grid-cols-3 py-10 relative max-w-screen-2xl"
  >
    <PageConfig class="min-h-[60vh]" />
    <Preview class="min-h-[60vh]" />
    <Settings class="min-h-[60vh]" />
  </section>
</template>

<script setup lang="ts">
import PageConfig from "@/components/editor/pageConfig/PageConfig.vue";
import Preview from "@/components/editor/preview/Preview.vue";
import Settings from "@/components/editor/settings/Settings.vue";
import { getPage } from "@/services/pages";
import { usePage } from "@/store/page";
import { useUIStore } from "@/store/ui";
import { MESSAGES } from "@/utils/messages";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted } from "vue";

const uiStore = useUIStore();
const pageStore = usePage();
const { page, unsavedChanges } = storeToRefs(pageStore);
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
    pageStore.initPage();
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
