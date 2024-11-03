<template>
  <aside
    class="grow flex flex-col gap-y-4 w-full"
    v-auto-animate="{ duration: 200 }"
  >
    <ButtonMethod
      v-for="method in methods"
      :key="method.id"
      :text="method.name"
      :icon="method.icon"
      :style="styles"
      @click="() => emit('setMethod', method)"
    />
  </aside>
</template>

<script setup lang="ts">
import ButtonMethod from "./ButtonMethod.vue";
import { IMethod, IMethodStyle } from "@/interfaces/page";

interface Props {
  methods: IMethod[];
  styles: IMethodStyle;
}

const { methods } = defineProps<Props>();
const emit = defineEmits(["setMethod"]);
</script>
