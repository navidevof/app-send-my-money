<template>
  <aside class="flex flex-col gap-y-4 w-full">
    <ProfileSettings />
    <Themes />
  </aside>
</template>

<script lang="ts" setup>
import Themes from "./Themes.vue";
import ProfileSettings from "./ProfileSettings.vue";
</script>
