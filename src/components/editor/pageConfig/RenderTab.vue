<template>
  <Methods v-if="pageConfigCurrentTab === 'Methods'" />
  <Appearance v-if="pageConfigCurrentTab === 'Appearance'" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditor } from "../store";
import Methods from "./methods/Methods.vue";
import Appearance from "./appearence/Appearance.vue";

const editorStore = useEditor();
const { pageConfigCurrentTab } = storeToRefs(editorStore);
</script>
