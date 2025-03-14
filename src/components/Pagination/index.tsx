"use client";
import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import PaginationButton from "./PaginationButton";
import { redirect, useRouter, useSearchParams } from "next/navigation";

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage?: number;
};

function Pagination({ itemCount, pageSize, currentPage = 1 }: Props) {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const onClick = (page: number) => {
    newSearchParams.set("page", page.toString());
    const query = "?" + newSearchParams;
    router.push("/issues/list" + query);
  };

  if (currentPage > pageCount || currentPage < 1 || isNaN(currentPage)) {
    newSearchParams.set("page", "1");
    redirect("/issues/list?" + newSearchParams);
  }

  return (
    <Box>
      <Flex align={"center"} gap={"1"}>
        <PaginationButton
          disabled={currentPage === 1}
          onClick={() => onClick(1)}
        >
          <BiChevronsLeft size="1.5rem" />
        </PaginationButton>
        <PaginationButton
          disabled={currentPage === 1}
          onClick={() => onClick(currentPage - 1)}
        >
          <BiChevronLeft size="1.5rem" />
        </PaginationButton>
        <Text size={"3"} weight={"medium"}>
          Page {currentPage} of {pageCount}
        </Text>
        <PaginationButton
          disabled={currentPage === pageCount}
          onClick={() => onClick(currentPage + 1)}
        >
          <BiChevronRight size="1.5rem" />
        </PaginationButton>
        <PaginationButton
          disabled={currentPage === pageCount}
          onClick={() => onClick(pageCount)}
        >
          <BiChevronsRight size="1.5rem" />
        </PaginationButton>
      </Flex>
    </Box>
  );
}

export default Pagination;
