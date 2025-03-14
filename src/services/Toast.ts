import { ToastOptions, TypeOptions, toast } from "react-toastify";

export default class Toast {
  private message: string;
  private toastType: TypeOptions;
  private toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  constructor(message: string, toastType: TypeOptions) {
    this.message = message;
    this.toastType = toastType;
  }

  public showToast = () =>
    toast(this.message, { ...this.toastOptions, type: this.toastType });
}
