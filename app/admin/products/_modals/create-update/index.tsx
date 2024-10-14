import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { getModalTitle, MainModalContext } from "../../helper";
import { setNestedPath } from "@/app/_utils";
import { MainModalBody } from "./modal-body";
import * as _ from "lodash";
import Footer from "./footer";
import { useProductSelector } from "@/lib/product/hooks";
import { tableDataDataElement } from "../../helper/interfaces & enums";
import ItemFilters from "./item-filters";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { ItemToolTip } from "./sub-parts";
import useModalMainState from "../../hooks/useModalMainState";
import { useCallback } from "react";

// This component has central state for the create and update of category, sub category and items.
// For managing state of this component we have a hook useModalMainState. Here we also set the category and subcategory list and reset the modal state when modal is closed.
// It has the following state
// id?: Edit of the entity (in case entity ios being updated)
// name: Name of the entity;
// upload: for uploading file we have a separate component ImgPreviewInput we store that upload in this
// categoryId: in case the current entity is subCategory/ item, we track the category here
// height: for storing the height of MainModalBody
// bodyState: which main component to display, default is bodyState.details. In case of items we can view, create, update and delete item filters here by clicking on the icon right side of the modal header or clicking on View Item Filters
// filterItems: For an item entity we store all the item filters here
// originalFilterItems - This is for storing the original filter items. In case items are gettting updated, then before store original items here to compares changes made and creating update payload for updating item entity accordingly
// deletedOriginalItems - This tracks all the items that are deleted by the user in the modal and are present in the database
// categoryList - Stores the list of all the categories, that are present. This is visible only for sub categories and items
// subCategoryList - Stores the list of all the sub categories for an item based on the selected category
// categoryVal - For controlling the input value of the category autocomplete
// subCategoryVal- For controlling the input value of the sub category autocomplete

// bodyRef - It is used for measuring the height of the main body of the modal excluding header and footer so that we can make the height of the item filter container equal to this height

const CreateUpdateModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen?: boolean) => void;
}) => {
  const [config, setConfig, bodyRef] = useModalMainState();
  const tab = useProductSelector((state) => state.componentDetails.tab);

  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  const modalDetails = useProductSelector(
    (state) => state.modalDetails,
  ) as unknown as tableDataDataElement;

  return (
    <Modal
      isOpen={isOpen}
      className=""
      hideCloseButton={true}
      isDismissable={false}
      onOpenChange={() => {
        onOpenChange();
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <MainModalContext.Provider
              value={{
                config,
                setMainData: setData,
                setAllData: setConfig,
              }}
            >
              <ModalHeader
                className={`flex ${tab === tabKeys.items ? "justify-between" : "justify-center"} items-center`}
              >
                {tab === tabKeys.items && <div></div>}
                {getModalTitle(tab, config, modalDetails)}
                <ItemToolTip />
              </ModalHeader>
              <div ref={bodyRef}>
                <MainModalBody />
              </div>
              <ItemFilters />
              <Footer onClose={onClose} />
            </MainModalContext.Provider>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateUpdateModal;
