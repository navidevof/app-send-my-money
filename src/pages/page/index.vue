<template>
  <main
    class="flex flex-col h-[100dvh] py-10"
    :style="{
      background: page?.styles.page.background,
      color: page?.styles.page.color,
    }"
  >
    <section
      class="flex flex-col aspect-mobile max-w-sm mx-auto w-11/12 h-full gap-y-8"
    >
      <Hero
        :photo="page?.photo"
        :displayName="page?.displayName"
        :url="page?.url"
      />
      <Methods
        :methods="page?.methods ?? []"
        :styles="page?.styles.method ?? {}"
        @setMethod="(method) => (currenMethod = method)"
      />
      <Footer />
    </section>
  </main>

  <Modal
    v-if="currenMethod"
    :method="currenMethod"
    :style="page?.styles.page ?? {}"
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
import Footer from "@/components/page/Footer.vue";
import Methods from "@/components/page/Methods.vue";
import Modal from "@/components/page/Modal.vue";
import Loader from "@/components/common/Loader.vue";

const route = useRoute();
const uiStore = useUIStore();
const { isLoading } = storeToRefs(uiStore);
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
  } catch (error) {
    uiStore.showAlert("error", MESSAGES.ERROR_DEFAULT);
    console.log({ error });
  } finally {
    isLoading.value = false;
  }
});
</script>
