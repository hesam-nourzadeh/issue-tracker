import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import LoadingTheme from "./LoadingTheme";

function IssueFormSkeleton() {
  return (
    <LoadingTheme>
      <div className="m-10 max-w-xl">
        <Skeleton height={"2rem"} />
        <Skeleton height={"30rem"} />
      </div>
    </LoadingTheme>
  );
}

export default IssueFormSkeleton;
