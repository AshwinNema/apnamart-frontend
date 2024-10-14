import { CardBody, CardFooter, ScrollShadow } from "@nextui-org/react";
import { StepperBackBtn, StepperNextBtn } from "./sub-components";
import { StepperComponent } from "./stepper";
import { MdArrowBackIosNew } from "react-icons/md";
import { useProfileSelector } from "@/lib/profile/hooks";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";
import { MainMerchantRegistrationContext } from "..";
import { useContext } from "react";
import { ToolTipBtn } from "@/app/_custom-components";

const RegistrationForm = () => {
  const underReview =
    useProfileSelector((state) => state.merchantDetails.registrationStatus) ===
    merchantRegistrationStatus.adminReview;

  const context = useContext(MainMerchantRegistrationContext);
  if (!context) return;
  const { setData } = context;
  return (
    <>
      <CardBody>
        {underReview ? (
          <ToolTipBtn
            toolTipProps={{
              color: "secondary",
              content: "Go back to main screen",
            }}
            buttonProps={{
              color: "secondary",
              variant: "ghost",
              isIconOnly: true,
              onPress: () => {
                setData("showReviewDetails")(true);
              },
            }}
          >
            <MdArrowBackIosNew />
          </ToolTipBtn>
        ) : null}
      </CardBody>
      <ScrollShadow>
        <CardBody className="h-[70svh]">
          <StepperComponent />
        </CardBody>
      </ScrollShadow>

      <CardFooter>
        <div className="flex justify-between w-full">
          <div>
            <StepperBackBtn />
          </div>
          <div>
            <StepperNextBtn />
          </div>
        </div>
      </CardFooter>
    </>
  );
};

export default RegistrationForm;
