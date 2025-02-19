import { Pagination } from "@heroui/react";

export const PaginationComponent = ({
  page,
  totalPages,
  onChange,
  containerClasName,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  containerClasName?: string;
}) => {
  return (
    <div className={`flex w-full justify-center ${containerClasName}`}>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={totalPages}
        onChange={onChange}
      />
    </div>
  );
};
