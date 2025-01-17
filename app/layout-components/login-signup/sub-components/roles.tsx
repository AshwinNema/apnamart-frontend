import React from "react";
import { Checkbox } from "@nextui-org/react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { modalTypes, roleCard, userRoleKeys, userRoles } from "../constants";
import { ImageComponent } from "@/app/_custom-components";
import { setVal } from "@/app/_utils";

export const RoleCard = ({
  src,
  role,
  roleHeader,
  selectedRole,
  setRole,
}: roleCard) => {
  return (
    <Card
      isPressable
      onPress={() => {
        setRole(role);
      }}
      className={`overflow-visible ${selectedRole === role && "border-2 border-[#0070f0]"}`}
      shadow="md"
    >
      <CardBody className="overflow-visible p-0">
        <ImageComponent
          isBlurred={selectedRole === role}
          width={200}
          height={200}
          alt={role}
          className="w-full object-contain"
          src={src}
        />

        <b className="flex justify-center">{roleHeader}</b>
      </CardBody>
      <CardFooter className="text-small relative overflow-visible">
        {selectedRole === role ? (
          <Checkbox
            isSelected={selectedRole === role}
            className="absolute bottom-0 right-[-0.75rem]"
            radius="full"
          />
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default function Roles({
  selectedRole,
  setRole,
  modalType,
}: {
  selectedRole: userRoleKeys;
  setRole: setVal;
  modalType: modalTypes | null;
}) {
  return (
    <>
      <p className="text-2xl flex justify-center mb-3">Choose Account Type</p>
      {modalType !== modalTypes.signUp ? (
        <div>
          <div className="flex justify-center mb-10">
            <RoleCard
              {...userRoles.admin}
              selectedRole={selectedRole}
              setRole={setRole}
            />
          </div>
        </div>
      ) : null}

      <div className="flex justify-between gap-3">
        <RoleCard
          {...userRoles.customer}
          selectedRole={selectedRole}
          setRole={setRole}
        />
        <RoleCard
          {...userRoles.merchant}
          selectedRole={selectedRole}
          setRole={setRole}
        />
      </div>

      <div className="flex justify-center text-gray-400">
        <div>
          <p>Hi {userRoles?.[selectedRole]?.roleHeader},</p>
          <p>
            {modalType === modalTypes.login
              ? userRoles?.[selectedRole]?.loginIntro
              : userRoles?.[selectedRole]?.signUpIntro}
          </p>
        </div>
      </div>
    </>
  );
}
