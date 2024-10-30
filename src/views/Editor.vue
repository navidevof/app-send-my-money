<template>
  <section
    class="mx-auto gap-x-10 xl:gap-x-20 justify-center h-fit w-11/12 grid grid-cols-1 lg:grid-cols-3 py-10 relative max-w-screen-xl"
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
</script>
