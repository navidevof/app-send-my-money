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

export { createStatAction };
