import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import PaginationButton from "./PaginationButton";

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

const buttonProps = {
  classname: "cursor-pointer",
  variant: "soft",
  color: "violet",
};

function Pagination({ itemCount, pageSize, currentPage }: Props) {
  const pageCount = Math.ceil(itemCount / pageSize);

  return (
    <Flex align={"center"} gap={"1"}>
      <PaginationButton>
        <BiChevronLeft size="1.5rem" />
      </PaginationButton>
      <PaginationButton>
        <BiChevronsLeft size="1.5rem" />
      </PaginationButton>
      <Text size={"3"} weight={"medium"}>
        Page {currentPage} of {pageCount}
      </Text>
      <PaginationButton>
        <BiChevronRight size="1.5rem" />
      </PaginationButton>
      <PaginationButton>
        <BiChevronsRight size="1.5rem" />
      </PaginationButton>
    </Flex>
  );
}

export default Pagination;
