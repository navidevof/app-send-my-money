<template>
  <aside class="size-full" ref="$chartDom"></aside>
</template>

<script lang="ts" setup>
import { IStat } from "@/interfaces/stat";
import * as echarts from "echarts";
import { onMounted, onBeforeUnmount, ref } from "vue";

interface Props {
  data: IStat[];
}

const bottomPadding = ref<string>("10%");
const { data } = defineProps<Props>();
const $chartDom = ref<HTMLDivElement>();

function convertTimestampToDate(timestamp: number) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const getActionCounts = () => {
  const newData = data.reduce((acc: any, item) => {
    const date = convertTimestampToDate(item.createdAt);
    if (!acc[date]) {
      acc[date] = {
        open_page: 0,
        click_method: 0,
        possible_payment: 0,
      };
    }
    acc[date][item.action] += 1;
    return acc;
  }, {});

  return newData;
};

const initChart = () => {
  const myChart = echarts.init($chartDom.value, "dark");
  const actionCounts = getActionCounts();
  const dates = Object.keys(actionCounts);
  const openPageCounts = dates.map((date) => actionCounts[date].open_page);
  const clickMethodCounts = dates.map(
    (date) => actionCounts[date].click_method
  );
  const possiblePaymentCounts = dates.map(
    (date) => actionCounts[date].possible_payment
  );

  const option = {
    backgroundColor: "#000000",
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Views", "Clicks", "Possible sales"],
      padding: [20, 0, 0, 0],
    },
    dataZoom: [
      {
        type: "slider",
        start: 20,
        end: 100,
        xAxisIndex: 0,
        handleSize: "80%",
        height: 10,
      },
      {
        type: "inside",
        start: 40,
        end: 100,
      },
    ],
    grid: {
      left: "2%",
      right: "5%",
      bottom: bottomPadding.value,
      containLabel: true,
    },
    toolbox: {
      orient: "horizontal", // Alineación horizontal de los botones
      right: "4%",
      top: "1%",
      feature: {
        saveAsImage: {
          show: true,
          iconStyle: {
            borderColor: "#ffffff",
          },
          emphasis: {
            iconStyle: {
              borderColor: "#0AAF4A", // Color cuando se pasa el mouse por encima
            },
          },
        },
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: dates,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Views",
        type: "line",
        data: openPageCounts,
      },
      {
        name: "Clicks",
        type: "line",
        data: clickMethodCounts,
      },
      {
        name: "Possible sales",
        type: "line",
        data: possiblePaymentCounts,
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
      const width = window.innerWidth;
      if (width > 768) {
        bottomPadding.value = "10%";
      }
      if (width <= 768 && width > 480) {
        bottomPadding.value = "20%";
      }
      if (width <= 480) {
        bottomPadding.value = "25%";
      }
      myChart.setOption({
        grid: {
          bottom: bottomPadding.value,
        },
      });
      myChart.resize();
    });

    resizeObserver.observe($chartDom.value);

    onBeforeUnmount(() => {
      resizeObserver.disconnect();
    });
  }
});
</script>
