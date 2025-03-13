import { ToastOptions, TypeOptions, toast } from "react-toastify";

export default class Toast {
  private constructor() {}

  private static toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  public static showToast = (message: string, toastType: TypeOptions) =>
    toast(message, { ...this.toastOptions, type: toastType });
}
