<template>
  <Methods v-if="pageConfigCurrentTab === 'Métodos'" />
  <Appearance v-if="pageConfigCurrentTab === 'Apariencia'" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditor } from "../../../store/editor";
import Methods from "./methods/Methods.vue";
import Appearance from "./appearence/Appearance.vue";

const editorStore = useEditor();
const { pageConfigCurrentTab } = storeToRefs(editorStore);
</script>
