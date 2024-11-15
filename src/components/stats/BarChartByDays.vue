<template>
  <aside class="size-full" ref="$chartDom"></aside>
</template>

<script lang="ts" setup>
import { IStat } from "@/interfaces/stat";
import { getLabelByAction, getWeeklyActionCounts } from "@/utils/formatStats";
import * as echarts from "echarts";
import { onMounted, onBeforeUnmount, ref } from "vue";

interface Props {
  data: IStat[];
}

const { data } = defineProps<Props>();
const $chartDom = ref<HTMLDivElement>();

const daysOfWeek = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

const createTooltip = (params: any) => {
  const dayValue = params[0].axisValue;
  const actions = data.filter((item) => {
    return (
      new Date(item.createdAt).toLocaleDateString("es-ES", {
        weekday: "long",
      }) === dayValue
    );
  });

  const actionsDetail = actions.reduce((acc: any, item) => {
    const action = getLabelByAction(item.action);
    if (!acc[action]) {
      acc[action] = 1;
    } else {
      acc[action]++;
    }
    return acc;
  }, {});

  return `${params[0].axisValueLabel} <br/> ${Object.entries(actionsDetail)
    .map(([action, count]) => `${action}: ${count}`)
    .join("<br/>")}`;
};

const initChart = () => {
  const myChart = echarts.init($chartDom.value, "dark");
  const weeklyCounts = getWeeklyActionCounts(data);

  const option = {
    backgroundColor: "#000000",
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => createTooltip(params),
    },
    legend: {
      data: ["Acciones"],
      padding: [20, 0, 0, 0],
    },
    xAxis: {
      type: "category",
      data: daysOfWeek, // Days of the week as labels
    },
    yAxis: {
      type: "value",
      minInterval: 1,
      axisLabel: {
        formatter: "{value}",
      },
    },
    series: [
      {
        name: "Acciones",
        type: "bar",
        data: weeklyCounts,
        itemStyle: {
          color: "rgba(75, 192, 192, 0.6)",
        },
      },
    ],
  };

  option && myChart.setOption(option);

  return myChart;
};

let myChart: echarts.ECharts;

onMounted(() => {
  if ($chartDom.value) {
    myChart = initChart();

    const resizeObserver = new ResizeObserver(() => {
      myChart.resize();
    });

    resizeObserver.observe($chartDom.value);

    onBeforeUnmount(() => {
      resizeObserver.disconnect();
    });
  }
});
</script>
