<template>
  <div class="flex flex-col gap-y-3 w-full pb-20">
    <h3 class="text-white font-medium">Mode</h3>
    <ButtonTheme
      v-for="(theme, idx) in THEMES"
      :key="idx"
      :isActive="currentTheme.value === theme.value"
      @click="selectTheme(theme)"
    >
      <template #default="{ isActive }">
        <h4 class="text-white xl:text-lg" :class="isActive && 'font-semibold'">
          {{ theme.name }}
        </h4>
      </template>
    </ButtonTheme>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePage } from "@/store/page";
import { THEMES } from "@/utils/themes";
import ButtonTheme from "./ButtonTheme.vue";
import { ITheme } from "@/interfaces/theme";

const pageStore = usePage();
const { currentTheme } = storeToRefs(pageStore);

const selectTheme = (theme: ITheme) => {
  currentTheme.value = theme;
  pageStore.loadTheme();
};
</script>
