"use client";
import UsersAlertDialog from "@/components/UsersAlertDialog";
import Toast from "@/services/Toast";
import { User } from "@prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { ApiClient } from "@/services/ApiClient";
import { useRouter } from "next/navigation";

function UserManagementActions({ userDetails }: { userDetails: User }) {
  const router = useRouter();

  const promoteToAdmin = async (userDetails: User) => {
    const apiClient = new ApiClient<Partial<User>>(
      `/api/users/${userDetails.id}`
    );
    let response;
    try {
      response = await apiClient.update({ isAdmin: !userDetails.isAdmin });
      Toast.showToast(
        `User role has been changed to ${response.data.isAdmin}`,
        "success"
      );
      router.replace("/user-management");
    } catch (error) {
      Toast.showToast(`An unkown error occured`, "error");
      router.replace("/user-management");
    }
  };

  const deleteUser = async (userId: string) => {
    const apiClient = new ApiClient<Partial<User>>(`/api/users/${userId}`);
    let response;
    try {
      response = await apiClient.delete();
      Toast.showToast(`User has been deleted successfully`, "success");
      router.replace("/user-management");
      console.log(response);
    } catch (error) {
      Toast.showToast(`An unkown error occured`, "error");
      router.replace("/user-management");
    }
  };

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
        action={() => promoteToAdmin(userDetails)}
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
        action={() => deleteUser(userDetails.id)}
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
