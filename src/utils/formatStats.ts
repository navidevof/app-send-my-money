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
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };

  data.forEach((item) => {
    const date = new Date(item.createdAt);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    if (weeklyData[dayName as keyof typeof weeklyData] !== undefined) {
      weeklyData[dayName as keyof typeof weeklyData] += 1;
    }
  });

  return Object.values(weeklyData);
};

export { formatHeader, getMethods, getSalesByOption, getWeeklyActionCounts };
