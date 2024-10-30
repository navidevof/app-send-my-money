<template>
  <Select
    :options="METHODS.sort((a, b) => a.label.localeCompare(b.label))"
    class="w-full !bg-custom-black-3 !rounded-2xl px-5 py-3 !text-white [&>]"
    filter
    optionLabel="label"
    v-model="methodTemplate"
    @change="onChange"
  >
    <template #value="slotProps">
      <div
        v-if="slotProps.value"
        class="flex gap-x-4 items-center !bg-custom-black-3"
      >
        <div
          class="aspect-square w-8 h-8 drop-shadow-black grid place-items-center rounded-lg overflow-hidden bg-white"
        >
          <img
            v-if="slotProps.value.icon"
            :alt="slotProps.value.label"
            :src="slotProps.value.icon"
            loading="lazy"
            class="size-full aspect-square"
            width="50"
            height="50"
          />
          <IconBank v-else class="size-full text-custom-black-2 p-1" />
        </div>
        <div>{{ slotProps.value.label }}</div>
      </div>
      <div v-else class="flex gap-x-2 items-center !bg-custom-black-3">
        <div
          class="aspect-square w-8 h-8 drop-shadow-black grid place-items-center rounded-lg overflow-hidden bg-white"
        >
          <IconBank class="size-full text-custom-black-2 p-1" />
        </div>
        <div>New method</div>
      </div>
    </template>
    <template #option="slotProps">
      <div class="flex gap-4 items-center w-full py-2">
        <div
          class="aspect-square size-7 drop-shadow-black grid place-items-center rounded-lg overflow-hidden bg-white"
        >
          <img
            v-if="slotProps.option.icon"
            :alt="slotProps.option.label"
            :src="slotProps.option.icon"
            loading="lazy"
            class="size-full aspect-square"
            width="50"
            height="50"
          />
          <IconBank v-else class="size-full text-custom-black-2 p-1" />
        </div>
        <div>{{ slotProps.option.label }}</div>
      </div>
    </template>
    <!-- <template #footer>
      <div class="p-3">Agregar nuevo país</div>
    </template> -->
  </Select>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Select from "primevue/select";
import { METHODS } from "@/mocks/methods";

import IconBank from "@/components/icons/IconBank.vue";
import { useEditor } from "../store";
import { storeToRefs } from "pinia";

const editorStore = useEditor();
const { currentMethod, currentOption } = storeToRefs(editorStore);

const methodTemplate = ref();

const onChange = () => {
  if (!currentMethod.value) return;

  currentMethod.value.template = methodTemplate.value.value;
  currentMethod.value.icon = methodTemplate.value.icon;
  currentMethod.value.name = methodTemplate.value.label;
};

onMounted(() => {
  if (!currentMethod.value) return;

  methodTemplate.value = {
    value: currentMethod.value.template,
    label: currentMethod.value.name,
    icon: currentMethod.value.icon,
  };
});

watch(currentMethod, () => {
  if (!currentMethod.value) return;

  methodTemplate.value = {
    value: currentMethod.value.template,
    label: currentMethod.value.name,
    icon: currentMethod.value.icon,
  };

  if (currentMethod.value.options.length > 0) {
    currentOption.value = currentMethod.value.options[0];
  }
});
</script>

<style>
.p-select-overlay {
  @apply !bg-custom-black-2 !mt-2 !rounded-xl px-5 py-3 !text-white drop-shadow-white;
}

.p-iconfield {
  @apply bg-custom-black-3 px-3 py-2 text-white mb-2 relative rounded-lg;
}

.p-inputicon {
  @apply -translate-y-1/2 -translate-x-4;
}
</style>
