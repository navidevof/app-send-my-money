import { IPage } from "@/interfaces/page";
import axiosClient from "@/lib/axiosClient";
import { responseError } from "@/utils/responseError";

const createAccount = async ({
  username,
  email,
  password,
  page,
}: {
  username: string;
  email: string;
  password: string;
  page: IPage;
}) => {
  try {
    const res = await axiosClient.post("/users/create", {
      username,
      email,
      password,
      page,
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
        defaultMessage: "Error creating account",
      }),
      data: null,
    };
  }
};

export { createAccount };
