import { IStatCreate } from "@/interfaces/stat";
import axiosClient from "@/lib/axiosClient";
import { responseError } from "@/utils/responseError";

const createStatAction = async (stat: IStatCreate) => {
  try {
    await axiosClient.post(`/stats/create`, stat);

    return {
      error: false,
      message: "ok",
    };
  } catch (error) {
    return {
      error: true,
      message: responseError({
        error,
        defaultMessage: "Error getting page",
      }),
    };
  }
};

const getStats = async ({
  pageUrl,
  filters,
}: {
  pageUrl: string;
  filters: {
    time: "24h" | "7d" | "1m" | "3m" | "6m" | "1y";
  };
}) => {
  try {
    const res = await axiosClient.post(`/stats`, {
      pageUrl,
      filters,
    });

    return {
      error: false,
      data: res.data.body,
      message: "ok",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: responseError({
        error,
        defaultMessage: "Error getting stats",
      }),
    };
  }
};

export { createStatAction, getStats };
