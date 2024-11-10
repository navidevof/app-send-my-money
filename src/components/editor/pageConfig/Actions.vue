<template>
  <div class="flex flex-col gap-y-3 w-full sticky top-0 z-10">
    <MainButton @click="onSave" :disabled="!unsavedChanges">
      <IconSave class="size-6 text-white" />
      <span class="text-lg font-semibold text-white"> Publish </span>
    </MainButton>
    <MainButton
      @click="editorStore.onAddNewMethod"
      v-show="pageConfigCurrentTab === 'Methods'"
    >
      <IconPlus class="size-6 text-white" />
      <span class="2xl:text-lg font-semibold text-white">Add method</span>
    </MainButton>
  </div>
</template>

<script setup lang="ts">
import { useEditor } from "../../../store/editor";
import { storeToRefs } from "pinia";

import MainButton from "@/components/ui/MainButton.vue";
import IconSave from "@/components/icons/IconSave.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import { updatePage } from "@/services/pages";
import { useUIStore } from "@/store/ui";
import { MESSAGES } from "@/utils/messages";

const uiStore = useUIStore();
const editorStore = useEditor();
const { page, filePhoto, pageConfigCurrentTab, unsavedChanges } =
  storeToRefs(editorStore);
const { isLoading } = storeToRefs(uiStore);

const onSave = async () => {
  try {
    isLoading.value = true;
    const res = await updatePage(page.value, filePhoto.value);
    if (res.error) {
      uiStore.showAlert("error", res.message);
      return;
    }

    uiStore.showAlert("success", "Page saved successfully");
    unsavedChanges.value = false;
    filePhoto.value = undefined;
  } catch (error) {
    uiStore.showAlert("error", MESSAGES.ERROR_DEFAULT);
    console.log({ error });
  } finally {
    isLoading.value = false;
  }
};
</script>
