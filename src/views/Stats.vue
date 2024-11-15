<template>
  <section class="flex flex-col gap-y-6 w-full py-6 max-w-screen-2xl mx-auto">
    <aside class="w-10/12 mx-auto grid place-content-end">
      <select
        v-model="currentTime"
        class="border border-white/50 bg-custom-black-1 rounded-2xl p-2"
        @change="loadStats"
      >
        <option value="7d">Últimos 7 días</option>
        <option value="1m">Últimos 30 días</option>
        <option :disabled="!page.plan?.isActive" value="3m">
          Últimos 3 meses
        </option>
        <option :disabled="!page.plan?.isActive" value="6m">
          Últimos 6 meses
        </option>
        <option :disabled="!page.plan?.isActive" value="1y">Último año</option>
      </select>
    </aside>
    <header
      class="flex justify-around gap-x-4 items-center w-10/12 mx-auto p-3 border border-white/50 rounded-2xl"
    >
      <div
        v-tooltip.top="{
          value: 'Visitas a la página',
          pt: {
            text: '!font-light !text-xs !bg-custom-black-3',
          },
          autoHide: false,
        }"
        class="flex items-center gap-x-2 cursor-pointer"
      >
        <IconEye class="size-6 md:size-8 text-white" />
        <span class="font-semibold md:text-lg text-white">
          {{ formatNumber(header.views) }}
        </span>
      </div>
      <div
        v-tooltip.top="{
          value: 'Clics en métodos',
          pt: {
            text: '!font-light !text-xs !bg-custom-black-3',
          },
          autoHide: false,
        }"
        class="flex items-center gap-x-2 cursor-pointer"
      >
        <IconClick class="size-6 md:size-8 text-white" />
        <span class="font-semibold md:text-lg text-white">
          {{ formatNumber(header.clicks) }}
        </span>
      </div>
      <div
        v-tooltip.top="{
          value: 'Posibles pagos',
          pt: {
            text: '!font-light !text-xs !bg-custom-black-3',
          },
          autoHide: false,
        }"
        class="flex items-center gap-x-2 cursor-pointer"
      >
        <IconPossiblePay class="size-6 md:size-8 text-white" />
        <span class="font-semibold md:text-lg text-white">
          {{ formatNumber(header.sales) }}
        </span>
      </div>
      <div
        v-tooltip.top="{
          value: 'Tasa de conversión',
          pt: {
            text: '!font-light !text-xs !bg-custom-black-3',
          },
          autoHide: false,
        }"
        class="flex items-center gap-x-2 cursor-pointer"
      >
        <IconPercentage class="size-6 md:size-8 text-white" />
        <span class="font-semibold md:text-lg text-white">
          {{ conversionRate }}
        </span>
      </div>
    </header>
    <aside
      class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 w-10/12 mx-auto"
    >
      <CardDetail
        :show-content="data.length > 0"
        class="md:col-span-2"
        :isPremium="false"
      >
        <template #header>
          <h3 class="text-white font-semibold duration-200 transition">
            Estadísticas generales
          </h3>
        </template>
        <template #content>
          <LineChart
            :data="data"
            :key="data.length"
            class="w-11/12 md:w-full mx-auto"
          />
        </template>
        <template #message-empty>
          <div
            class="flex flex-col justify-center my-auto items-center w-9/12 mx-auto gap-y-2"
          >
            <IconTimeline class="size-8 text-white" />
            <p class="text-white text-center text-sm">
              No se encontrado información
            </p>
          </div>
        </template>
      </CardDetail>
      <CardDetail :showContent="methods.length > 0" class="w-full">
        <template #header>
          <h3 class="text-white font-semibold">Métodos</h3>
          <span class="text-white/50 text-sm text-end">CLICS</span>
        </template>
        <template #content>
          <button
            v-for="method in methods"
            :key="method.template"
            class="rounded-lg py-2 px-4 flex justify-between duration-200 transition items-center text-white w-full"
            :class="[
              currentMethodName === method.name
                ? 'bg-custom-green-2'
                : ' bg-custom-black-2 hover:bg-custom-black-3',
            ]"
            @click="handleClickMethod(method)"
          >
            <div class="flex items-center gap-x-3 md:gap-x-4">
              <ImageBank :icon="method.icon" />
              <span class="text-sm line-clamp-1">{{ method.name }}</span>
            </div>
            <span class="font-medium">{{ method.clicks }}</span>
          </button>
        </template>
        <template #message-empty>
          <div
            class="flex flex-col justify-center my-auto items-center w-9/12 mx-auto gap-y-2"
          >
            <IconTimeline class="size-8 text-white" />
            <p class="text-white text-center text-sm">
              No se encontrado información
            </p>
          </div>
        </template>
      </CardDetail>
      <CardDetail :showContent="options.length > 0" class="w-full">
        <template #header>
          <h3 class="text-white font-semibold duration-200 transition">
            Opciones
            <span
              v-show="currentMethodName"
              class="text-white/50 text-sm font-light"
            >
              > {{ currentMethodName }}
            </span>
          </h3>
          <span class="text-white/50 text-sm text-end">POSIBLES PAGOS</span>
        </template>
        <template #content>
          <button
            v-for="option in options"
            :key="option.optionId"
            class="rounded-lg py-2 px-4 flex justify-between items-center text-white bg-custom-black-2 hover:bg-custom-black-3 w-full"
          >
            <span class="text-sm line-clamp-1">{{ option.optionName }}</span>
            <span class="font-medium">{{ option.sales }}</span>
          </button>
        </template>
        <template #message-empty>
          <div
            class="flex flex-col justify-center my-auto items-center w-9/12 mx-auto gap-y-2"
          >
            <IconTimeline class="size-8 text-white" />
            <p class="text-white text-center text-sm">
              {{
                isFirstSelectMethod
                  ? "Selecciona un método para ver las estadísticas"
                  : "No se encontrado información"
              }}
            </p>
          </div>
        </template>
      </CardDetail>
      <CardDetail :show-content="data.length > 0" class="md:col-span-2">
        <template #header>
          <h3 class="text-white font-semibold duration-200 transition">
            Actions por día
          </h3>
        </template>
        <template #content>
          <BarChartByDays :data="data" :key="data.length" />
        </template>
        <template #message-empty>
          <div
            class="flex flex-col justify-center my-auto items-center w-9/12 mx-auto gap-y-2"
          >
            <IconTimeline class="size-8 text-white" />
            <p class="text-white text-center text-sm">
              No se encontrado información
            </p>
          </div>
        </template>
      </CardDetail>
    </aside>
  </section>
</template>

<script setup lang="ts">
import IconClick from "@/components/icons/IconClick.vue";
import IconEye from "@/components/icons/IconEye.vue";
import IconPercentage from "@/components/icons/IconPercentage.vue";
import IconPossiblePay from "@/components/icons/IconPossiblePay.vue";
import IconTimeline from "@/components/icons/IconTimeline.vue";
import BarChartByDays from "@/components/stats/BarChartByDays.vue";
import CardDetail from "@/components/stats/CardDetail.vue";
import LineChart from "@/components/stats/LineChart.vue";
import ImageBank from "@/components/ui/ImageBank.vue";
import { IStat } from "@/interfaces/stat";
import { getStats } from "@/services/stats";
import { useEditor } from "@/store/editor";
import { useUIStore } from "@/store/ui";
import { formatNumber } from "@/utils/formatNumber";
import {
  formatHeader,
  getMethods,
  getSalesByOption,
} from "@/utils/formatStats";
import { MESSAGES } from "@/utils/messages";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

const uiStore = useUIStore();
const editorStore = useEditor();
const { isLoading } = storeToRefs(uiStore);
const { page, showModalPremium } = storeToRefs(editorStore);

const currentTime = ref<"7d" | "1m" | "3m" | "6m" | "1y">("7d");
const data = ref<IStat[]>([]);
const header = ref<{
  views: number;
  clicks: number;
  sales: number;
}>({
  views: 0,
  clicks: 0,
  sales: 0,
});
const conversionRate = computed(() => {
  return header.value.clicks > 0
    ? ((header.value.sales / header.value.clicks) * 100).toFixed(1)
    : 0; // Retorna 0 si no hay clics para evitar división por cero
});
const methods = ref<
  {
    icon: string;
    name: string;
    template: string;
    clicks: number;
  }[]
>([]);
const options = ref<
  {
    optionId: string;
    optionName: string;
    sales: number;
  }[]
>([]);
const isFirstSelectMethod = ref(true);

const currentMethodName = ref<string>();

const validTime = () => {
  if (!currentTime.value) return false;
  if (!["24h", "7d", "1m", "3m", "6m", "1y"].includes(currentTime.value))
    return false;
  if (
    !page.value.plan?.isActive &&
    ["3m", "6m", "1y"].includes(currentTime.value)
  )
    return false;

  return true;
};

onMounted(async () => {
  await loadStats();
});

const handleClickMethod = (method: any) => {
  currentMethodName.value = method.name;
  options.value = getSalesByOption(data.value, method.template);
  isFirstSelectMethod.value = false;
};

const loadStats = async () => {
  const isValid = validTime();
  if (!isValid) {
    showModalPremium.value = true;
    return;
  }

  try {
    isLoading.value = true;
    const res = await getStats({
      pageUrl: page.value.url,
      filters: {
        time: currentTime.value,
      },
    });

    if (res.error || !res.data) {
      uiStore.showAlert("error", res.message);
      return;
    }

    data.value = res.data;
    header.value = formatHeader(data.value);
    methods.value = getMethods(data.value);
  } catch (error) {
    uiStore.showAlert("error", MESSAGES.ERROR_DEFAULT);
    console.log({ error });
  } finally {
    isLoading.value = false;
  }
};
</script>
