import React from "react";
import { PaginationText, StyledContainer, ChevronIcon } from "./styles";
import { ChevronLeft, ChevronRight } from "react-feather";
import { ListCallsPaginationPropsType } from "../../types/components/ListCallsPagination";

const ListCallsPagination: React.FC<ListCallsPaginationPropsType> = ({ pagination, onChangePage }) => {
  if (!pagination || pagination.totalPage < 1) return null;

  const { page, pageSize, total, totalPage } = pagination;
  const startIdx = (page - 1) * pageSize + 1;
  const endIdx = Math.min(total, page * pageSize);

  const handleClickPrev = () => {
    if (page > totalPage) {
      onChangePage(totalPage);
    } else if (page > 1) {
      onChangePage(page - 1);
    }
  };

  const handleClickNext = () => {
    if (page < 1) {
      onChangePage(2);
    } else if (page < totalPage) {
      onChangePage(page + 1);
    }
  };

  return <StyledContainer>
    <ChevronIcon onClick={handleClickPrev} disabled={page <= 1}>
      <ChevronLeft />
    </ChevronIcon>
    <PaginationText>
      {`${startIdx} - ${endIdx} of ${total}`}
    </PaginationText>
    <ChevronIcon onClick={handleClickNext} disabled={page >= totalPage}>
      <ChevronRight />
    </ChevronIcon>
  </StyledContainer>
};

export default ListCallsPagination;
