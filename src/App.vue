<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { inject } from "@vercel/analytics";
import { onUnmounted } from "vue";

onUnmounted(() => {
  inject();
});
</script>
