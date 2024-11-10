<template>
  <aside
    class="grow flex flex-col gap-y-4 w-full"
    v-auto-animate="{ duration: 200 }"
  >
    <ButtonMethod
      v-for="(method, idx) in methods"
      :key="method.id"
      :text="method.name"
      :icon="method.icon"
      :style="styles"
      @click="() => onClickMethod(method)"
      v-show="plan?.isActive || idx < 3"
    />
  </aside>
</template>

<script setup lang="ts">
import { createStatAction } from "@/services/stats";
import ButtonMethod from "./ButtonMethod.vue";
import { IMethod, IMethodStyle, IPlan } from "@/interfaces/page";
import { Action } from "@/interfaces/stat";

interface Props {
  url: string;
  methods: IMethod[];
  styles: IMethodStyle;
  plan?: IPlan;
}

const { methods, url } = defineProps<Props>();
const emit = defineEmits(["setMethod"]);

const onClickMethod = (method: IMethod) => {
  emit("setMethod", method);
  createStatAction({
    action: Action.CLICK_METHOD,
    pageUrl: url,
    metadata: {
      method: {
        methodTemplate: method.template,
        methodName: method.name,
        methodIcon: method.icon,
      },
    },
  });
};
</script>
