const validateError = (error: { code: string }): string => {
  let errorMessage = "Error al iniciar sesión, intenta de nuevo.";
  switch (error.code) {
    case "auth/email-already-in-use":
      errorMessage = "El correo ya se encuentra en uso, prueba con otro.";
      break;
    case "auth/too-many-requests":
      errorMessage =
        "Hemos desactivado temporalmente el acceso a tu cuenta por multiples intentos fallidos, actualiza tu contraseña o espera unos minutos.";
      break;
    case "auth/invalid-credential":
      errorMessage = "Información de acceso incorrecta, prueba con otro.";
      break;
  }
  return errorMessage;
};

export { validateError };
