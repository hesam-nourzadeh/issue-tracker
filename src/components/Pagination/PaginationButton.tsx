import { Button } from "@radix-ui/themes";
import React, { ReactNode } from "react";
import { IconContext } from "react-icons";

function PaginationButton({ children }: { children: ReactNode }) {
  return (
    <Button className="cursor-pointer" variant="soft" color="violet">
      {children}
    </Button>
  );
}

export default PaginationButton;
