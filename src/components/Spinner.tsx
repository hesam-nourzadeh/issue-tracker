import React from "react";

function Spinner() {
  return (
    <div className="relative cursor-not-allowed">
      <div className="w-8 h-8 rounded-full absolute border-4 border-solid border-gray-200"></div>
      <div className="w-8 h-8 rounded-full animate-spin absolute border-4 border-solid border-green-500 border-t-transparent shadow-md"></div>
    </div>
  );
}

export default Spinner;
