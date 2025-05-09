"use client";
import { Callout } from "@radix-ui/themes";
import React from "react";
import { radixColors } from "@/utils/radixColors";

type Props = {
  bgColor: radixColors;
  textColor: radixColors;
  text: string;
  className?: string;
};

function Alert({ bgColor, textColor, text, className = "" }: Props) {
  return (
    <Callout.Root
      color={bgColor}
      className={`w-full flex items-center justify-center rounded-none ${className}`}
    >
      <Callout.Text color={textColor} className="text-lg">
        {text}
      </Callout.Text>
    </Callout.Root>
  );
}

export default Alert;
