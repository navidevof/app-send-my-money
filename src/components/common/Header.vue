<template>
  <header class="py-5 flex border-b border-b-white/50">
    <nav
      class="flex justify-between items-center max-w-screen-2xl mx-auto w-11/12"
    >
      <router-link class="flex items-center gap-x-3" to="/">
        <img
          src="@/assets/logo.webp"
          alt="Logo Send My Money"
          class="aspect-square w-[50px] h-[50px]"
          width="50"
          height="50"
          loading="eager"
        />
        <h1 class="text-white text-2xl font-bold hidden md:block">
          Send My Money
        </h1>
      </router-link>
      <div class="flex items-center gap-x-3">
        <button
          class="w-[45px] h-[45px] rounded-full overflow-hidden border-2 border-white/80"
          name="avatar"
          type="button"
        >
          <div class="size-full bg-custom-green-1 grid place-items-center">
            <h2 class="text-white font-semibold text-lg">N</h2>
          </div>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>
