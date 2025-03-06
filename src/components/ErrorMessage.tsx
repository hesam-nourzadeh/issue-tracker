import { Callout } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

function ErrorMessage({ children }: PropsWithChildren) {
  if (!children) return null;
  return (
    <Callout.Root>
      <Callout.Text color="red">{children}</Callout.Text>
    </Callout.Root>
  );
}

export default ErrorMessage;
