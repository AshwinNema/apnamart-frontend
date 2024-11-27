import LoginSignUpModal from "@/app/layout-components/login-signup";
import { FaCartShopping } from "react-icons/fa6";
import styles from "../styles.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { addRemoveCartProduct, MainContext } from "../helpers";
import { Button, Spinner, useDisclosure } from "@nextui-org/react";
import { useAppSelector } from "@/lib/main/hooks";
import { modalTypes } from "@/app/layout-components/login-signup/constants";
import { produce } from "immer";
import { setNestedPath } from "@/app/_utils";
import { useParams, useRouter } from "next/navigation";

export const ProductBtns = () => {
  const mainContext = useContext(MainContext);
  const { id } = useParams();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [config, setConfig] = useState<{
    modalType: modalTypes;
    showAddCartLoader: boolean;
  }>({
    modalType: modalTypes.login,
    showAddCartLoader: false,
  });
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  useEffect(() => {
    !isOpen &&
      setConfig(
        produce((draft) => {
          draft.modalType = modalTypes.login;
        }),
      );
  }, [isOpen]);

  if (!mainContext) return null;
  return (
    <>
      <div
        className={`mt-6 ${styles["cartBtns"]}`}
        style={{
          marginLeft: `${mainContext.config.buttonLeftMargin}px`,
        }}
      >
        <Button
          radius="none"
          className="text-white"
          size="lg"
          color="warning"
          onPress={() => {
            if (!user) {
              onOpen();
              return;
            }
            setConfig(
              produce((draft) => {
                draft.showAddCartLoader = true;
              }),
            );
            addRemoveCartProduct(
              Number(id),
              { connect: true, quantity: 1 },
              () => {
                setConfig(
                  produce((draft) => {
                    draft.showAddCartLoader = false;
                  }),
                );
              },
              () => {
                router.push("/cart");
              },
              { showLoader: false },
            );
          }}
        >
          <FaCartShopping />
          {config.showAddCartLoader ? (
            <Spinner />
          ) : (
            <>
              {!!mainContext?.config?.details?.cartQuantity || !user
                ? "Add to Cart"
                : "Go to cart"}
            </>
          )}
        </Button>

        <Button radius="none" className="text-white bg-buyNowButton" size="lg">
          Buy Now
        </Button>
      </div>
      <LoginSignUpModal
        modalType={config.modalType}
        setModalType={setData("modalType")}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
