"use client";
import { Pagination, PaginationItem, PaginationList } from "./pagination";
export function PaginationDefaultView() {
  return (
    <Pagination>
      <PaginationList>
        <PaginationItem>{"<"}</PaginationItem>
        <PaginationItem>1</PaginationItem>
        <PaginationItem active>2</PaginationItem>
        <PaginationItem>3</PaginationItem>
        <PaginationItem>{">"}</PaginationItem>
      </PaginationList>
    </Pagination>
  );
}
export default PaginationDefaultView;
