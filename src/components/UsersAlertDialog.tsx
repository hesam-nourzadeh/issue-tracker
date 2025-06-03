"use client";
import AlertDialog from "@/components/AlertDialog";
import { radixColors } from "@/utils/radixColors";
import { Button } from "@radix-ui/themes";
import { ReactElement } from "react";

type Props = {
  trigger: ReactElement;
  action: () => void;
  title: string;
  description: string;
  actionBtnText: string;
  btnColor: radixColors;
};

function UsersAlertDialog({
  trigger,
  action,
  title,
  description,
  actionBtnText,
  btnColor,
}: Props) {
  return (
    <AlertDialog
      trigger={trigger}
      title={title}
      description={description}
      actionButton={
        <Button style={{ cursor: "pointer" }} color={btnColor}>
          {actionBtnText}
        </Button>
      }
      action={action}
    />
  );
}

export default UsersAlertDialog;
