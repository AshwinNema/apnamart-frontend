import { eventEmitterSubject, loaderEvents } from "@/app/_custom-components";
import {} from "@/app/_custom-components";
import { commonRoleRoutes } from "@/app/_utils";
import { tabKeys } from "@/lib/profile/slices/component-state.slice";
import { Button, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Subject } from "rxjs";

export const AddressModal = ({
  emitter,
}: {
  emitter: Subject<eventEmitterSubject>;
}) => {
  return (
    <>
      <ModalHeader>Address is needed</ModalHeader>
      <ModalBody>
        <p>
          We need your address before you proceed to checkout. Please click on
          the button below to get your address saved.
        </p>
      </ModalBody>
      <ModalFooter className="flex justify-end">
        <Button
          className="text-white"
          onPress={() => {
            emitter.next({
              type: loaderEvents.routeNavigation,
              route: `${commonRoleRoutes.profile}?selectedTab=${tabKeys.address}`,
            });
          }}
          color="primary"
        >
          Set Address
        </Button>
      </ModalFooter>
    </>
  );
};

export const EmptyCartModel = ({
  emitter,
}: {
  emitter: Subject<eventEmitterSubject>;
}) => {
  return (
    <>
      <ModalHeader>Your cart is empty</ModalHeader>
      <ModalBody>
        <p>
          Please add items in the cart before checking out. Please click below
          to add items
        </p>
      </ModalBody>
      <ModalFooter className="flex justify-end">
        <Button
          className="text-white"
          onPress={() => {
            emitter.next({
              type: loaderEvents.routeNavigation,
              route: `/`,
            });
          }}
          color="primary"
        >
          Go to home
        </Button>
      </ModalFooter>
    </>
  );
};
