import { IPage, IPageExternal } from "@/interfaces/page";
import axiosClient from "@/lib/axiosClient";
import { responseError } from "@/utils/responseError";

const getPage = async (url?: string) => {
  try {
    const res = await axiosClient.get(`/pages/${url}`);

    return {
      error: false,
      data: res.data.body as IPage,
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

const getExternalPage = async (url: string) => {
  try {
    const res = await axiosClient.get(`/pages/external/${url}`);

    return {
      error: false,
      data: res.data.body as IPageExternal,
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

const verifyUrlPage = async (url: string) => {
  try {
    await axiosClient.get(`/pages/verify-url/${url}`);

    return {
      error: false,
      message: "ok",
    };
  } catch (error) {
    return {
      error: true,
      message: responseError({
        error,
        defaultMessage: "Error verifying url",
      }),
    };
  }
};

const updatePage = async (page: any, file?: File) => {
  try {
    const formData = new FormData();

    formData.append("page", JSON.stringify(page));

    if (file) {
      formData.append("file", file);
    }

    await axiosClient.put("/pages/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      error: false,
      message: "ok",
    };
  } catch (error) {
    return {
      error: true,
      message: responseError({
        error,
        defaultMessage: "Error updating page",
      }),
    };
  }
};

export { getPage, getExternalPage, verifyUrlPage, updatePage };