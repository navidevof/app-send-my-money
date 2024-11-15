import { IPage } from "@/interfaces/page";
import axiosClient from "@/lib/axiosClient";
import { responseError } from "@/utils/responseError";

const createAccount = async ({
  username,
  email,
  password,
  page,
  orderId,
}: {
  username: string;
  email: string;
  password: string;
  page: IPage;
  orderId?: string;
}) => {
  try {
    delete page.plan;
    const res = await axiosClient.post("/users/create", {
      username,
      email,
      password,
      page,
      orderId,
    });

    const data = res.data.body as IPage;

    return {
      error: false,
      message: "ok",
      data,
    };
  } catch (error) {
    console.log({ error });
    return {
      error: true,
      message: responseError({
        error,
        defaultMessage: "Error al crear la cuenta",
      }),
      data: null,
    };
  }
};

export { createAccount };
