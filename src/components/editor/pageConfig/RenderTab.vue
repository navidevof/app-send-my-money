<template>
  <Methods v-if="pageConfigCurrentTab === 'Methods'" />
  <Appearance v-if="pageConfigCurrentTab === 'Appearance'" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePage } from "../../../store/page";
import Methods from "./methods/Methods.vue";
import Appearance from "./appearence/Appearance.vue";

const pageStore = usePage();
const { pageConfigCurrentTab } = storeToRefs(pageStore);
</script>
