import React from "react";

function Spinner({
  className,
  spinnerColor,
}: {
  className?: string;
  spinnerColor?: string;
}) {
  return (
    <div className={`relative cursor-not-allowed ${className}`}>
      <div className="w-8 h-8 rounded-full absolute border-4 border-solid border-gray-200"></div>
      <div
        className={`w-8 h-8 rounded-full animate-spin absolute border-4 border-solid border-${
          spinnerColor ? spinnerColor : "green"
        }-500 border-t-transparent shadow-md`}
      ></div>
    </div>
  );
}

export default Spinner;
