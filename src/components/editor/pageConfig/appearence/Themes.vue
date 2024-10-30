<template>
  <div class="flex flex-col gap-y-3 w-full pb-20">
    <h3 class="text-white font-medium">Mode</h3>
    <ButtonTheme
      v-for="theme in THEMES"
      :key="theme.value"
      :isActive="currentTheme.value === theme.value"
      @click="currentTheme = theme"
    >
      <template #default="{ isActive }">
        <!-- <div
          class="aspect-square w-8 h-8 p-1 drop-shadow-black grid place-items-center rounded-lg overflow-hidden bg-white"
        >
          <IconMoon class="size-5" v-if="currentTheme.value === 'dark'" />
          <IconSun class="size-5" v-if="currentTheme.value === 'light'" />
        </div> -->
        <h4 class="text-white xl:text-lg" :class="isActive && 'font-semibold'">
          {{ theme.name }}
        </h4>
      </template>
    </ButtonTheme>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditor } from "@/components/editor/store";
import { THEMES } from "@/utils/themes";
import ButtonTheme from "./ButtonTheme.vue";
// import IconMoon from "@/components/icons/IconMoon.vue";
// import IconSun from "@/components/icons/IconSun.vue";

const editorStore = useEditor();
const { currentTheme } = storeToRefs(editorStore);
</script>
