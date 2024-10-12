import { Button, CardFooter, useDisclosure } from "@nextui-org/react";
import * as _ from "lodash";
import { BiSolidEditLocation } from "react-icons/bi";
import { IoSaveSharp } from "react-icons/io5";
import AddressDetailsDrawer from "./drawer";
import { drawerValidation, updateUserAddress } from "../../utils";
import { getZodErrMsg } from "@/app/_utils";
import { errorToast, toastErrorIcons } from "@/app/_utils/toast";
import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
export default function AddressFooter() {
  const addressDetails = useProfileSelector((state) => state.addressDetails);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useProfileSelector((data) => data.user);
  const dispatch = useProfileDispatch();
  return (
    <CardFooter>
      <div className="flex justify-between w-full">
        <Button
          variant="bordered"
          onClick={onOpen}
          endContent={<BiSolidEditLocation />}
          className="cursor-pointer p-3"
          color="primary"
          size="sm"
        >
          Enter complete location details
        </Button>

        <Button
          className="cursor-pointer p-3"
          color="primary"
          size="sm"
          variant="shadow"
          onPress={() => {
            const data = drawerValidation.safeParse(
              _.omit(addressDetails, ["zoom", "latitude", "longtitude"]),
            );
            if (data.error || !data.data) {
              const errMsg = getZodErrMsg(data.error);
              errorToast({ msg: errMsg, iconType: toastErrorIcons.validation });
              return;
            }

            updateUserAddress(
              {
                ...data.data,
                latitude: Number(addressDetails.latitude),
                longtitude: Number(addressDetails.longtitude),
              },
              user,
              dispatch,
            );
          }}
          endContent={<IoSaveSharp />}
        >
          Save{" "}
        </Button>
      </div>
      <AddressDetailsDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
    </CardFooter>
  );
}
