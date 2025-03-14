import LoadingTheme from "@/components/LoadingTheme";
import React from "react";
import Skeleton from "react-loading-skeleton";

function loading() {
  return (
    <div className="m-10 w-4/12">
      <LoadingTheme>
        <Skeleton count={6} />
      </LoadingTheme>
    </div>
  );
}

export default loading;
