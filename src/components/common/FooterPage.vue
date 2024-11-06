<script setup lang="ts">
import MainButton from "@/components/ui/MainButton.vue";
</script>

<template>
  <footer class="w-full flex flex-col items-center gap-y-3">
    <a href="/" target="_blank" rel="noreferrer noopener">
      <MainButton
        class="!w-fit mx-auto opacity-50 hover:opacity-100 group hover:!bg-custom-green-1 drop-shadow-green border border-white/50"
      >
        <img
          src="@/assets/logo.webp"
          alt="SMM"
          class="aspect-square size-9"
          width="50"
          height="50"
        />
        <span class="text-white text-sm">Want your own payment page?</span>
      </MainButton>
    </a>
  </footer>
</template>
