<template>
  <aside
    class="fixed inset-0 z-50 flex items-center justify-center bg-custom-black-1/50 backdrop-blur-xl transition duration-200"
  >
    <div
      class="flex flex-col max-w-2xl rounded-3xl py-11 px-5 bg-white drop-shadow-white w-10/12 gap-y-7 relative"
      :style="{ ...page.styles.page }"
    >
      <button
        class="absolute top-4 right-4 lg:top-8 lg:right-8"
        @click="emit('close')"
      >
        <IconClose class="size-6" />
      </button>
      <h2 class="text-center uppercase font-bold text-lg lg:text-2xl">
        {{ currentMethod?.name }}
      </h2>
      <div
        class="flex gap-x-2 md:justify-center items-center overflow-x-auto custom-scroll"
      >
        <TabButton
          v-for="option in currentMethod?.options"
          :key="option.id"
          :isActive="option === currentOption"
          @click="currentOption = option"
          class="w-fit"
        >
          <h3
            class="md:text-lg font-semibold transition duration-200 text-nowrap"
          >
            {{ option.name }}
          </h3>
        </TabButton>
      </div>
      <div class="flex flex-col gap-y-4 w-full">
        <Field
          v-for="field in currentOption?.fields"
          :key="field.id"
          :field="field"
        />
        <span
          v-show="!currentOption?.fields.length"
          class="text-center text-pretty text-sm"
        >
          It looks like this payment method doesn’t have details available. Try
          choosing a different method.
        </span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditor } from "../store";
import TabButton from "@/components/ui/TabButton.vue";
import IconClose from "@/components/icons/IconClose.vue";
import Field from "./Field.vue";

const editorStore = useEditor();
const { page, currentMethod, currentOption } = storeToRefs(editorStore);
const emit = defineEmits(["close"]);
</script>
