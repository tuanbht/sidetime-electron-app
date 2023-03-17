import { ListCallsPaginationType } from "../models";

export type ListCallsPaginationPropsType = {
  pagination?: ListCallsPaginationType;
  onChangePage: (page: number) => void
};
