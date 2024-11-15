<template>
  <div class="flex items-center w-full gap-x-2">
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
    <button type="button" @click="$emit('delete')">
      <IconTrash class="text-custom-red-1 size-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Select from "primevue/select";
import { METHODS } from "@/mocks/methods";

import IconBank from "@/components/icons/IconBank.vue";
import ImageBank from "@/components/ui/ImageBank.vue";
import { IMethod } from "@/interfaces/page";
import IconTrash from "@/components/icons/IconTrash.vue";

interface Props {
  method: IMethod;
}

const { method } = defineProps<Props>();

const emit = defineEmits(["change", "delete"]);
const methodTemplate = ref();

onMounted(() => {
  if (!method.icon) return;

  methodTemplate.value = {
    icon: method.icon,
    label: method.name,
    value: method.template,
  };
});

const onChange = () => {
  emit("change", methodTemplate.value);
};
</script>
