<template>
  <aside
    class="fixed inset-0 z-50 flex items-center justify-center bg-custom-black-1/50 backdrop-blur-xl transition duration-200"
  >
    <div
      class="flex flex-col max-w-2xl rounded-3xl py-11 px-5 bg-white drop-shadow-green border border-white/50 w-11/12 gap-y-7 relative"
      :style="{ ...pageStyle }"
    >
      <button
        class="absolute top-4 right-4 lg:top-8 lg:right-8"
        @click="handleClose"
      >
        <IconClose class="size-6" />
      </button>
      <div class="flex justify-center w-full items-center gap-x-2">
        <ImageBank :icon="method?.icon" />
        <h2 class="text-center uppercase font-bold md:text-lg">
          {{ method?.name }}
        </h2>
      </div>
      <div
        class="flex gap-x-2 md:justify-center items-center overflow-x-auto custom-scroll"
        ref="$tabs"
        v-show="method?.options.length > 1"
      >
        <TabButton
          v-for="option in method?.options"
          :key="option.id"
          :isActive="option === currentOption"
          @click="selectOption(option)"
          class="w-fit"
        >
          <h3
            class="md:text-lg font-semibold transition duration-200 text-nowrap"
          >
            {{ option.name }}
          </h3>
        </TabButton>
      </div>
      <div
        class="flex flex-col gap-y-4 w-full"
        v-auto-animate="{ duration: 200 }"
      >
        <Field
          v-for="field in currentOption?.fields"
          :key="field.id"
          :field="field"
          :style="methodStyle"
          @copy="handleCopy"
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
import { ref, nextTick, onMounted } from "vue";
import TabButton from "@/components/ui/TabButton.vue";
import IconClose from "@/components/icons/IconClose.vue";
import Field from "./Field.vue";
import ImageBank from "@/components/ui/ImageBank.vue";
import { IMethod, IMethodStyle, IOption, IPageStyle } from "@/interfaces/page";
import { createStatAction } from "@/services/stats";
import { Action } from "@/interfaces/stat";
import { usePage } from "@/store/page";
import { storeToRefs } from "pinia";
const emit = defineEmits(["close"]);

interface Props {
  url: string;
  pageStyle: IPageStyle;
  methodStyle: IMethodStyle;
  method: IMethod;
}

const pageStore = usePage();
const { canAddCopyOptionStat } = storeToRefs(pageStore);
const { method, url } = defineProps<Props>();

const $tabs = ref<HTMLElement>();
const currentOption = ref<IOption>();

onMounted(() => {
  if (method.options.length) {
    currentOption.value = method.options[0];
    createStatAction({
      action: Action.CLICK_METHOD_OPTION,
      pageUrl: url,
      metadata: {
        method: {
          methodTemplate: method.template,
          methodName: method.name,
          methodIcon: method.icon,
          option: {
            optionId: currentOption.value.id,
            optionName: currentOption.value.name,
          },
        },
      },
    });
  }
});

function selectOption(option: IOption) {
  currentOption.value = option;
  createStatAction({
    action: Action.CLICK_METHOD_OPTION,
    pageUrl: url,
    metadata: {
      method: {
        methodTemplate: method.template,
        methodName: method.name,
        methodIcon: method.icon,
        option: {
          optionId: currentOption.value.id,
          optionName: currentOption.value.name,
        },
      },
    },
  });
  nextTick(() => scrollToCenter(option));
}

function scrollToCenter(option: IOption) {
  if (!method || !$tabs.value) return;

  const optionIndex = method.options.findIndex((opt) => opt.id === option.id);

  const optionTab = $tabs.value.children[optionIndex] as HTMLElement;
  const containerWidth = $tabs.value.clientWidth;
  const optionTabWidth = optionTab.clientWidth;
  const optionTabLeft = optionTab.offsetLeft;

  const scrollPosition =
    optionTabLeft - containerWidth / 2 + optionTabWidth / 2;

  $tabs.value.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });
}

const handleCopy = () => {
  if (canAddCopyOptionStat.value) {
    createStatAction({
      action: Action.POSSIBLE_PAYMENT,
      pageUrl: url,
      metadata: {
        method: {
          methodTemplate: method.template,
          methodName: method.name,
          methodIcon: method.icon,
        },
      },
    });

    canAddCopyOptionStat.value = false;
  }
};

const handleClose = () => {
  emit("close");
  canAddCopyOptionStat.value = true;
};
</script>
