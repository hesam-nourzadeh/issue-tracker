import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

async function LoadingCreateIssuePage() {
  return (
    <SkeletonTheme>
      <div className="m-10">
        <Skeleton count={3} />
        <Box className="w-3/5">
          <Skeleton height={"100px"} count={10} />
        </Box>
      </div>
    </SkeletonTheme>
  );
}

export default LoadingCreateIssuePage;
