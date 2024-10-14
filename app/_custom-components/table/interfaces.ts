import { HTTP_METHODS } from "@/app/_services";
import React from "react";

export interface columns {
  align?: "start" | "center" | "end";
  key: string;
  label: string;
  headerClass?: string;
}

export interface tableProps<tableItem> {
  ariaLabel: string;
  columns: columns[];
  items: tableItem[];
  renderCell: (data: tableItem, columnKey: React.Key) => React.JSX.Element;
  emptyContent?: string | React.JSX.Element;
  isStriped?: boolean;
  totalPages?: number;
  page?: number;
  setPage?: (page: number) => void;
  className?: string;
}

export interface TableActionProps {
  onClick?: () => void;
  deleteBtnText?: string;
  modalBodyMsg?: string;
  deleteMethod?: HTTP_METHODS;
  deleteUrl?: string;
  deleteSuccessMsg?: string;
  onDeleteSuccess?: () => void;
  onDelete?: (onClose: () => void) => any;
  editTooltipText?: string;
  deleteToolTipText?: string;
}
