import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@radix-ui/themes";
import React from "react";
import Alert from "./Alert";
import { User } from "@prisma/client";

type Props = { users: User[] };

function UserList({ users }: Props) {
  return (
    <>
      <Table.Root my={"5"} size={"3"} variant="surface">
        <TableHeader>
          <Table.Row>
            <Table.ColumnHeaderCell>
              <Link>Name</Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden sm:block">
              <Link>Email</Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <Link>Role</Link>
            </Table.ColumnHeaderCell>
          </Table.Row>
        </TableHeader>
        <TableBody>
          {users.map((value, key) => (
            <TableRow className="hover:bg-blue-50" key={key}>
              <TableCell>
                <Link href={`/user-management/${value.id}`}>{value.name}</Link>
              </TableCell>
              <TableCell className="hidden sm:block">{value.email}</TableCell>
              <TableCell>{value.isAdmin ? "Admin" : "User"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {!users && (
          <Table.Row>
            <Table.Cell className="p-0" colSpan={3}>
              <Alert
                text="No users found."
                bgColor="bronze"
                textColor="orange"
                className="w-full"
              />
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Root>
    </>
  );
}

export default UserList;
