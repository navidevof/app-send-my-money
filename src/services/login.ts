import { auth } from "@/firebase";
import { validateError } from "@/utils/firebasesCodeValidation";
import { signInWithEmailAndPassword } from "firebase/auth";

const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return {
      error: false,
      message: "Logged in successfully",
    };
  } catch (error: any) {
    return {
      error: true,
      message: validateError(error),
    };
  }
};

const signOut = async () => {
  try {
    await auth.signOut();
    return {
      error: false,
      message: "Logged out successfully",
    };
  } catch (error: any) {
    return {
      error: false,
      message: validateError(error),
    };
  }
};

export { signIn, signOut };
