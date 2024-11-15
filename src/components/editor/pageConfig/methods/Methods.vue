<template>
  <Draggable
    class="flex flex-col gap-y-4 w-full pb-32 lg:pb-0"
    v-model="page.methods"
    ghost-class="opacity-0"
    itemKey="id"
    v-show="page.methods.length > 0"
    :move="onMove"
  >
    <template #item="{ element: method, index: idx }">
      <ButtonMethod
        :text="method.name"
        :icon="method.icon"
        @click="currentMethod = method"
        @delete="() => onDeleteMethod(method)"
        :isActive="currentMethod?.id === method.id"
        :isDisabled="!page.plan?.isActive && idx + 1 > 3"
        tag="transition-group"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
        }"
      />
    </template>
  </Draggable>
  <aside
    v-show="(page.methods.length ?? 0) <= 0"
    class="w-full flex flex-col justify-center items-center gap-2 p-5 bg-custom-black-3 rounded-lg cursor-pointer"
    @click="editorStore.onAddNewMethod"
  >
    <img
      src="@/assets/logo.webp"
      alt="logo"
      class="size-14"
      width="50"
      height="50"
    />
    <h3 class="text-white text-center font-light text-pretty">
      Agregar un Nuevo método para comenzar a personalizar.
    </h3>
  </aside>
</template>
<script setup lang="ts">
import Draggable from "vuedraggable";

import ButtonMethod from "./ButtonMethod.vue";
import { useEditor } from "../../../../store/editor";
import { storeToRefs } from "pinia";
import { IMethod } from "@/interfaces/page";

const editorStore = useEditor();
const { page, currentMethod } = storeToRefs(editorStore);

const onDeleteMethod = (method: IMethod) => {
  if (!page.value) return;
  page.value.methods = page.value.methods.filter((m) => m.id !== method.id);
  if (currentMethod.value?.id === method.id) {
    currentMethod.value = undefined;
  }
};

const onMove = (event: any) => {
  if (page.value.plan?.isActive) return true;
  return event.draggedContext.index + 1 <= 3;
};
</script>
