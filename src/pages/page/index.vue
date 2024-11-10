<template>
  <main
    class="flex flex-col h-[100dvh] py-10"
    :style="{
      background: page?.styles.page.background,
      color: page?.styles.page.color,
    }"
  >
    <section
      class="flex flex-col aspect-mobile max-w-lg mx-auto w-11/12 h-full gap-y-8"
    >
      <Hero
        :photo="page?.photo"
        :displayName="page?.displayName"
        :url="page?.url"
        :messageToShare="page?.messageToShare"
      />
      <Methods
        :methods="page?.methods ?? []"
        :styles="page?.styles.method ?? {}"
        :url="page?.url ?? ''"
        @setMethod="(method) => (currenMethod = method)"
      />
      <FooterPage v-if="!page?.plan?.isActive" />
    </section>
  </main>

  <Modal
    v-if="currenMethod"
    :method="currenMethod"
    :pageStyle="page?.styles.page ?? {}"
    :methodStyle="page?.styles.method ?? {}"
    :url="page?.url ?? ''"
    @close="currenMethod = undefined"
  />

  <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { IMethod, IPageExternal } from "@/interfaces/page";
import { getExternalPage } from "@/services/pages";
import { useRoute } from "vue-router";
import { useUIStore } from "@/store/ui";
import { MESSAGES } from "@/utils/messages";
import { storeToRefs } from "pinia";
import Hero from "@/components/page/Hero.vue";
import Methods from "@/components/page/Methods.vue";
import Modal from "@/components/page/Modal.vue";
import Loader from "@/components/common/Loader.vue";
import FooterPage from "@/components/common/FooterPage.vue";
import { createStatAction } from "@/services/stats";
import { Action } from "@/interfaces/stat";
import { usePage } from "@/store/page";

const route = useRoute();
const uiStore = useUIStore();
const pageStore = usePage();
const { isLoading } = storeToRefs(uiStore);
const { canAddCopyOptionStat } = storeToRefs(pageStore);
const page = ref<IPageExternal>();
const currenMethod = ref<IMethod>();

onMounted(async () => {
  try {
    const url = route.params.url as string;
    isLoading.value = true;
    const res = await getExternalPage(url);

    if (res.error || !res.data) {
      uiStore.showAlert("error", res.message || MESSAGES.ERROR_DEFAULT);
      return;
    }

    page.value = res.data;
    document.title = page.value.displayName;
    canAddCopyOptionStat.value = true;
    createStatAction({
      action: Action.OPEN_PAGE,
      pageUrl: url,
    });
  } catch (error) {
    uiStore.showAlert("error", MESSAGES.ERROR_DEFAULT);
    console.log({ error });
  } finally {
    isLoading.value = false;
  }
});
</script>
