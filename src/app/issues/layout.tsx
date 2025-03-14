import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
      {children}
    </div>
  );
}
