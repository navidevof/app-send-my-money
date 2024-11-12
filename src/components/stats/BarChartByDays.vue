<template>
  <aside class="size-full" ref="$chartDom"></aside>
</template>

<script lang="ts" setup>
import { IStat } from "@/interfaces/stat";
import { getWeeklyActionCounts } from "@/utils/formatStats";
import * as echarts from "echarts";
import { onMounted, onBeforeUnmount, ref } from "vue";

interface Props {
  data: IStat[];
}

const { data } = defineProps<Props>();
const $chartDom = ref<HTMLDivElement>();

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const initChart = () => {
  const myChart = echarts.init($chartDom.value, "dark");
  const weeklyCounts = getWeeklyActionCounts(data);

  const option = {
    backgroundColor: "#000000",
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Actions"],
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
        name: "Actions",
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
