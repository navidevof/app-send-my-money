const validateError = (error: { code: string }): string => {
  let errorMessage = "User login failed, please try again later.";
  switch (error.code) {
    case "auth/email-already-in-use":
      errorMessage = "Mail is already in use, try another email";
      break;
    case "auth/too-many-requests":
      errorMessage =
        "Access to this account has been temporarily disabled due to many failed login attempts. You can restore it immediately by resetting your password or you can try again later.";
      break;
    case "auth/invalid-credential":
      errorMessage = "The data are incorrect.";
      break;
  }
  return errorMessage;
};

export { validateError };
