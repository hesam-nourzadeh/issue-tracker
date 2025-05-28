"use client";
import AlertDialog from "@/components/AlertDialog";
import Toast from "@/services/Toast";
import { User } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

type Props = {
  user: User;
  trigger: ReactElement;
};

function UsersAlertDialog({ user, trigger }: Props) {
  const router = useRouter();

  return (
    <AlertDialog
      trigger={trigger}
      title="User role change"
      description={`Are you sure you want to change their role to ${
        user.isAdmin ? "normal user" : "admin"
      } ?`}
      actionButton={
        <Button style={{ cursor: "pointer" }} color="red">
          Change
        </Button>
      }
      action={async () => {
        console.log("change !!!!");
        router.refresh();
        Toast.showToast(
          `Role has been successfully changed to ${
            user.isAdmin ? "normal user" : "admin"
          }.`,
          "success"
        );
      }}
    />
  );
}

export default UsersAlertDialog;
