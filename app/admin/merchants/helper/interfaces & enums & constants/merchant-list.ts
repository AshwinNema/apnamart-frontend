import { setKeyVal } from "@/app/_utils";
import { UserInterface } from "@/lib/main/slices/user/user.slice";
import { newRegistrationState } from "./merchant-registration";

export enum merchantSelectStatus {
  adminReview = "review_by_admin",
  completed = "completed",
  all = "all",
  notStarted = "not started",
  banned = "Banned",
}

export const merchantSelectList: {
  label: string;
  key: merchantSelectStatus;
}[] = [
  { label: "All", key: merchantSelectStatus.all },
  { label: "Not started", key: merchantSelectStatus.notStarted },
  { label: "Under admin review", key: merchantSelectStatus.adminReview },
  { label: "Completed", key: merchantSelectStatus.completed },
  { label: "Banned", key: merchantSelectStatus.banned },
];

export interface merchantListState extends newRegistrationState<UserInterface> {
  type: merchantSelectStatus;
}

export interface merchantTableProps {
  config: merchantListState;
  queryData: (page: number) => void;
  setData: setKeyVal;
  onClick: (
    data: UserInterface,
    type: "unblock merchant" | "block merchant" | "view registration details",
  ) => void;
}

export type merchantListOnClickParams = Parameters<
  merchantTableProps["onClick"]
>;
