import React, { PropsWithChildren } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

function LoadingTheme({ children }: PropsWithChildren) {
  return (
    <SkeletonTheme
      baseColor="rgba(160,160,160, 0.3)"
      highlightColor="rgba(160,160,160, 0.5)"
    >
      {children}
    </SkeletonTheme>
  );
}

export default LoadingTheme;
