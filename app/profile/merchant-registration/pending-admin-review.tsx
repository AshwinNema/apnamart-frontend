import { ChatIcon } from "@/app/_custom-components";
import { setKeyVal } from "@/app/_utils";
import { Button, CardBody, CardHeader } from "@nextui-org/react";
const PendingAdminReview = ({ setData }: { setData: setKeyVal }) => {
  return (
    <>
      <CardHeader>
        <div className="font-bold text-2xl flex justify-center w-full mb-11">
          Registration Status : Under admin review
        </div>
      </CardHeader>
      <CardBody>
        <div className="inline-block align-middle">
          Your profile is currently being reviewed by the admin. We will get
          back to you soon! ⏳ If you have any questions, feel free to reach out
          through chat support icon
          <span className="inline-block align-middle">
            <Button
              size="lg"
              className="p-2 scale-[0.7]"
              isIconOnly={true}
              radius="full"
              color="primary"
            >
              <ChatIcon />
            </Button>
          </span>
          below on bottom right
        </div>
        <div className="mt-5">
          <Button
            onPress={() => {
              setData("showReviewDetails")(false);
            }}
            variant="bordered"
            color="primary"
          >
            View Profile Details
          </Button>
        </div>
      </CardBody>
    </>
  );
};

export default PendingAdminReview;
