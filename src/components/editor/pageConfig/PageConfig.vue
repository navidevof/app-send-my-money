<template>
  <aside
    class="flex flex-col lg:px-6 lg:py-7 gap-y-8 max-w-lg bg-custom-black-1 md:max-h-[calc(100vh-180px)] h-full overflow-y-auto lg:max-w-full overflow-x-hidden mx-auto w-full lg:rounded-3xl lg:border lg: border-white/50 lg:drop-shadow-green relative z-10"
    v-auto-animate="{ duration: 200 }"
  >
    <Tabs />
    <Actions />
    <RenderTab />
  </aside>
</template>

<script setup lang="ts">
import Tabs from "./Tabs.vue";
import Actions from "./Actions.vue";
import RenderTab from "./RenderTab.vue";
</script>
