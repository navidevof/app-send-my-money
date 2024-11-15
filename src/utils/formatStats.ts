import { Action, IStat } from "@/interfaces/stat";

const formatHeader = (data: IStat[]) => {
  const header = data.reduce(
    (acc: any, item) => {
      if (item.action === Action.OPEN_PAGE) {
        acc.views++;
      }
      if (item.action === Action.CLICK_METHOD) {
        acc.clicks++;
      }
      if (item.action === Action.POSSIBLE_PAYMENT) {
        acc.sales++;
      }

      return acc;
    },
    {
      views: 0,
      clicks: 0,
      sales: 0,
    }
  );

  return header;
};

const getMethods = (data: IStat[]) => {
  const methods = data.reduce((acc: any, item) => {
    if (item.action === Action.CLICK_METHOD) {
      if (!acc[item!.metadata!.method!.methodTemplate]) {
        acc[item!.metadata!.method!.methodTemplate] = {
          icon: item!.metadata!.method?.methodIcon,
          name: item!.metadata!.method?.methodName,
          template: item!.metadata!.method?.methodTemplate,
          clicks: 1,
        };
      } else {
        acc[item!.metadata!.method!.methodTemplate].clicks++;
      }
    }
    return acc;
  }, {});

  return Object.values(methods).sort(
    (a: any, b: any) => b.clicks - a.clicks
  ) as {
    icon: string;
    name: string;
    template: string;
    clicks: number;
  }[];
};

const getSalesByOption = (data: IStat[], methodTemplate: string) => {
  const salesByOption = data.reduce((acc: any, item) => {
    if (
      item.action === Action.POSSIBLE_PAYMENT &&
      item.metadata?.method?.methodTemplate === methodTemplate
    ) {
      if (!acc[item!.metadata!.method!.option!.optionId]) {
        acc[item!.metadata!.method!.option!.optionId] = {
          optionId: item!.metadata!.method!.option?.optionId,
          optionName: item!.metadata!.method!.option?.optionName,
          sales: 1,
        };
      } else {
        acc[item!.metadata!.method!.option!.optionId].sales++;
      }
    }
    return acc;
  }, {});

  return Object.values(salesByOption) as {
    optionId: string;
    optionName: string;
    sales: number;
  }[];
};

const getWeeklyActionCounts = (data: IStat[]) => {
  const weeklyData = {
    lunes: 0,
    martes: 0,
    miércoles: 0,
    jueves: 0,
    viernes: 0,
    sábado: 0,
    domingo: 0,
  };

  data.forEach((item) => {
    const date = new Date(item.createdAt);
    const dayName = date.toLocaleDateString("es-ES", { weekday: "long" });
    if (weeklyData[dayName as keyof typeof weeklyData] !== undefined) {
      weeklyData[dayName as keyof typeof weeklyData] += 1;
    }
  });

  console.log({ weeklyData });

  return Object.values(weeklyData);
};

const getLabelByAction = (action: Action) => {
  switch (action) {
    case Action.OPEN_PAGE:
      return "Visitas";
    case Action.CLICK_METHOD:
      return "Clics en métodos";
    case Action.CLICK_METHOD_OPTION:
      return "Clics en opciones";
    case Action.POSSIBLE_PAYMENT:
      return "Posible pago";
    default:
      return "Otros";
  }
};

export {
  formatHeader,
  getMethods,
  getSalesByOption,
  getWeeklyActionCounts,
  getLabelByAction,
};
