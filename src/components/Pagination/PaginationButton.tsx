"use client";
import { Button } from "@radix-ui/themes";
import React, { ReactNode } from "react";

type Props = {
  onClick: () => void;
  children: ReactNode;
  disabled: boolean;
};

function PaginationButton({ children, onClick, disabled }: Props) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className="cursor-pointer"
      variant="soft"
      color="violet"
    >
      {children}
    </Button>
  );
}

export default PaginationButton;
