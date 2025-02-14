import { Avatar, Badge } from "@heroui/react";
import * as _ from "lodash";
import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { BsPlusCircleFill } from "react-icons/bs";
import { uploadProfileImage } from "../api";
import { IconInput } from "../../_custom-components";

export const ProfileImage = () => {
  const user = useProfileSelector((state) => state.user);
  const dispatch = useProfileDispatch();
  return (
    <div className="flex justify-center mt-5 mb-10">
      <Badge
        className="bg-[transparent] border-0 cursor-pointer"
        shape="circle"
        content={
          <>
            <IconInput
              Icon={BsPlusCircleFill}
              accept="image/png, image/jpeg"
              props={{
                className:
                  "scale-[2] relative left-[1rem] bottom-[-1.5rem] cursor-pointer",
              }}
              callback={(file) => uploadProfileImage(file, dispatch)}
            />
          </>
        }
        placement="bottom-right"
      >
        <Avatar
          radius="full"
          size="lg"
          className="scale-[2]"
          src={`${user?.photo || ""}`}
        />
      </Badge>
    </div>
  );
};
