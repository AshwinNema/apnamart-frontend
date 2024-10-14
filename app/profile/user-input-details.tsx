import { Button, Card, CardBody } from "@nextui-org/react";
import { PasswordInput, TextInput } from "@/app/_custom-components/inputs";
import { Avatar, AvatarIcon } from "@nextui-org/react";
import { IoIosMail } from "react-icons/io";
import { z } from "zod";
import { IoSaveSharp } from "react-icons/io5";
import * as _ from "lodash";
import { updateUserDetails } from "./api";
import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { tabKeys } from "@/lib/profile/slices/component-state.slice";
import { setUserDetails } from "@/lib/profile/slices/main-user-details.slice";
import { useContext } from "react";
import { MainProfileContext } from "./page";

export default function BasicDetails({}: {}) {
  const mainUserUpdate = useContext(MainProfileContext);

  const dispatch = useProfileDispatch();
  const tab = useProfileSelector((state) => state.componentState.tab);
  const userDetails = useProfileSelector((state) => state.mainUserDetails);
  if (!mainUserUpdate) return null;
  const setDetails = (key: string) => (value: any) => {
    dispatch(setUserDetails({ [key]: value }));
  };

  return (
    <Card>
      <CardBody>
        {tab === tabKeys.basicDetails ? (
          <>
            <TextInput
              value={userDetails.name}
              setData={setDetails("name")}
              Icon={() => (
                <Avatar
                  className="scale-75 relative top-2 right-0.5"
                  size="sm"
                  icon={<AvatarIcon />}
                />
              )}
              label="Name"
              placeholder="Please enter your name"
            />

            <TextInput
              value={userDetails.email}
              setData={setDetails("email")}
              validationSchema={z.string().email()}
              Icon={() => <IoIosMail className="scale-150 mt-5" />}
              className="mt-5 mb-3"
              label="Email"
              placeholder="Please enter your email"
            />
          </>
        ) : null}

        {tab === tabKeys.settings ? (
          <>
            <PasswordInput
              password={userDetails.password}
              setData={setDetails("password")}
              placeholder="Enter your new password"
              label="Password"
            />
          </>
        ) : null}

        <div className="flex justify-end">
          <Button
            className="cursor-pointer p-3"
            color="primary"
            size="sm"
            variant="shadow"
            onPress={() => {
              const data = _.pick(
                userDetails,
                tab === tabKeys.settings ? ["password"] : ["name", "email"],
              );
              updateUserDetails(data, tab, dispatch, mainUserUpdate);
            }}
            endContent={<IoSaveSharp />}
          >
            Save{" "}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
