import { Box, Button, AlertDialog as RadixADialog } from "@radix-ui/themes";
import React, { ReactNode } from "react";

type Props = {
  trigger: ReactNode;
  title: string;
  description: string;
  actionButton: ReactNode;
  action: () => void;
};

function AlertDialog({
  trigger,
  title,
  description,
  actionButton,
  action,
}: Props) {
  return (
    <RadixADialog.Root>
      <RadixADialog.Trigger>{trigger}</RadixADialog.Trigger>
      <RadixADialog.Content>
        <RadixADialog.Title>{title}</RadixADialog.Title>
        <RadixADialog.Description>{description}</RadixADialog.Description>
        <Box className="space-x-6 mt-6">
          <RadixADialog.Cancel>
            <Button style={{ cursor: "pointer" }} color="gray" variant="soft">
              Cancel
            </Button>
          </RadixADialog.Cancel>
          <RadixADialog.Action onClick={action}>
            {actionButton}
          </RadixADialog.Action>
        </Box>
      </RadixADialog.Content>
    </RadixADialog.Root>
  );
}

export default AlertDialog;
