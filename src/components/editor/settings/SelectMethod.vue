<template>
  <Select
    :options="METHODS.sort((a, b) => a.label.localeCompare(b.label))"
    class="w-full !bg-custom-black-3 !rounded-2xl !text-white"
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
        <ImageBank :icon="slotProps.value.icon" />
        <div>{{ slotProps.value.label }}</div>
      </div>
      <div v-else class="flex gap-x-4 items-center !bg-custom-black-3">
        <div
          class="aspect-square w-8 h-8 drop-shadow-black grid place-items-center rounded-lg overflow-hidden bg-white"
        >
          <IconBank class="size-full text-custom-black-2 p-1" />
        </div>
        <div>Nuevo método</div>
      </div>
    </template>
    <template #option="slotProps">
      <div class="flex gap-4 items-center w-full">
        <ImageBank :icon="slotProps.option.icon" />
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
import { useEditor } from "../../../store/editor";
import { storeToRefs } from "pinia";
import ImageBank from "@/components/ui/ImageBank.vue";

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
