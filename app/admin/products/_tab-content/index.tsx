import { Button, useDisclosure } from "@nextui-org/react";
import { MdCategory } from "react-icons/md";
import React, { useEffect } from "react";
import { queryTableData } from "../helper";
import DataTable from "./table";
import Autocomplete from "./autocomplete";
import CreateUpdateModal from "../_modals/create-update";
import { useProductDispatch, useProductSelector } from "@/lib/product/hooks";
import {
  setDetails,
  setIsOpen,
} from "@/lib/product/slices/component-details.slice";
import { clearModalDetails } from "@/lib/product/slices/modal-details.slice";
import styles from "../../../styles.module.css";

export default function TabContent() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { tab, id, refreshData, closeModal } = useProductSelector(
    (state) => state.componentDetails,
  );
  const table = useProductSelector((state) => state.table);
  const dispatch = useProductDispatch();
  const loadData = (page?: number, id?: number) => {
    const params: { page: number; limit: number; id?: number } = {
      page: page || table.page,
      limit: table.limit,
    };
    if (id) {
      params.id = id;
    }
    queryTableData(tab, params, dispatch);
  };

  useEffect(() => {
    loadData(id ? 1 : table.page, id ? id : undefined);
  }, [tab, id, refreshData]);

  useEffect(() => {
    !isOpen && dispatch(clearModalDetails());
    dispatch(setIsOpen(isOpen));
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (!closeModal) return;
    onClose();
    dispatch(setDetails({ closeModal: false }));
  }, [closeModal, dispatch]);

  return (
    <div>
      <div
        className={`flex justify-between gap-3 items-center mb-5 ${styles["product-autocomplete-container"]}`}
      >
        <Autocomplete />
        <Button
          onPress={onOpen}
          startContent={<MdCategory />}
          color="primary"
          fullWidth
        >
          Create {tab}
        </Button>
      </div>
      <CreateUpdateModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <DataTable loadData={loadData} onOpen={onOpen} />
    </div>
  );
}
