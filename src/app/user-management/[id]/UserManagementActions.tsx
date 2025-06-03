"use client";
import UsersAlertDialog from "@/components/UsersAlertDialog";
import Toast from "@/services/Toast";
import { User } from "@prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";

function UserManagementActions({ userDetails }: { userDetails: User }) {
  const router = useRouter();

  const promoteToAdmin = async () => {
    console.log("change !!!!");
    router.refresh();
    Toast.showToast(
      `Role has been successfully changed to ${
        userDetails.isAdmin ? "normal user" : "admin"
      }.`,
      "success"
    );
  };

  const deleteUser = async () => {};

  return (
    <Flex className="sm:mx-16 my-10 sm:my-0 flex-col md:flex-row w-8/12 mx-auto md:space-x-6 space-y-6 md:space-y-0">
      <UsersAlertDialog
        title="User role change"
        description={`Are you sure you want to change their role to ${
          userDetails.isAdmin ? "normal user" : "admin"
        } ?`}
        actionBtnText="Change"
        btnColor="blue"
        key={0}
        action={promoteToAdmin}
        trigger={
          <Button
            color={userDetails.isAdmin ? "yellow" : "green"}
            style={{ cursor: "pointer" }}
          >
            <RiAdminLine />
            {userDetails.isAdmin ? "Demote to user" : "Promote to admin"}
          </Button>
        }
      />
      <UsersAlertDialog
        key={1}
        action={deleteUser}
        title="User Deletion"
        description={"Are you sure you want to delete this user"}
        actionBtnText="Delete"
        btnColor="red"
        trigger={
          <Button style={{ cursor: "pointer" }} color="red">
            <AiFillCloseCircle />
            Delete User
          </Button>
        }
      />
    </Flex>
  );
}

export default UserManagementActions;
