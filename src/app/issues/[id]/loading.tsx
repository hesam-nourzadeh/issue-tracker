import LoadingTheme from "@/components/LoadingTheme";
import { Card } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";

function loading() {
  return (
    <div className="m-10 w-4/12">
      <LoadingTheme>
        <Skeleton count={4} />
        <Card className="w-3/5">
          <Skeleton count={3} />
        </Card>
      </LoadingTheme>
    </div>
  );
}

export default loading;
