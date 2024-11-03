const responseError = ({
  error,
  defaultMessage,
}: {
  error: any;
  defaultMessage?: string;
}) => {
  if (error?.response?.data?.error) {
    return error?.response?.data?.message;
  }

  return defaultMessage;
};

export { responseError };
