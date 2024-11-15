<template>
  <aside class="flex flex-col gap-y-5">
    <div
      class="flex flex-col gap-y-3"
      v-show="currentOption?.fields?.length"
      v-auto-animate="{ duration: 200 }"
    >
      <Field
        v-for="field in currentOption?.fields"
        :key="field.id"
        :field="field"
        @delete="onDeleteField(field)"
      />
    </div>

    <p
      v-show="!currentOption?.fields?.length"
      class="w-full font-light text-pretty p-5 text-center rounded-lg bg-custom-black-3 text-white"
    >
      Necesitas agregar más detalles? Agrega un nuevo campo aquí. 👇
    </p>

    <MainButton @click="onAddNewField" class="">
      <IconPlus class="size-6 text-white" />
      <span class="2xl:text-lg font-semibold text-white">Add field</span>
    </MainButton>
  </aside>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useEditor } from "../../../store/editor";

import IconPlus from "@/components/icons/IconPlus.vue";
import MainButton from "@/components/ui/MainButton.vue";
import Field from "./Field.vue";
import { IField } from "@/interfaces/page";

const editorStore = useEditor();
const { currentOption } = storeToRefs(editorStore);

const onAddNewField = () => {
  currentOption.value?.fields.push({
    id: `field-${Date.now()}`,
    label: "New field",
    value: "",
  });
};

const onDeleteField = (field: IField) => {
  if (!currentOption.value) return;
  currentOption.value.fields = currentOption.value?.fields.filter(
    (f) => f.id !== field.id
  );
};
</script>
