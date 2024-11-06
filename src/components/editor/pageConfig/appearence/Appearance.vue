<template>
  <aside class="flex flex-col gap-y-4 w-full">
    <ProfileSettings />
    <ShareSettings />
    <Themes />
  </aside>
</template>

<script lang="ts" setup>
import Themes from "./Themes.vue";
import ProfileSettings from "./ProfileSettings.vue";
import ShareSettings from "./ShareSettings.vue";
</script>
