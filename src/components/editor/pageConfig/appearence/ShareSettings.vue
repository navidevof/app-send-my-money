<template>
  <div class="flex flex-col gap-y-2 w-full">
    <h3 class="text-white font-medium">Mensaje al compartir</h3>
    <textarea
      class="w-full px-5 py-2 rounded-lg font-light bg-custom-black-3 text-white"
      type="text"
      v-model="page.messageToShare"
      placeholder="This is the message that will be displayed when sharing"
      rows="4"
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useEditor } from "@/store/editor";
import { onMounted } from "vue";
import { MESSAGES } from "@/utils/messages";

const editorStore = useEditor();
const { page } = storeToRefs(editorStore);

onMounted(() => {
  page.value.messageToShare =
    page.value.messageToShare ?? MESSAGES.SHARE_DEFAULT;
});
</script>
