import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { newRegistrationDetails } from "../../../../helper/interfaces & enums & constants";
import { ImageComponent } from "@/app/_custom-components";
import styles from "@/app/styles.module.css";
import { CiViewList } from "react-icons/ci";
import { ApproveRegistrationBtn } from "..";

export const RegistrationDetailsCard = ({
  details,
  setSelectedCard,
}: {
  details: newRegistrationDetails;
  setSelectedCard: (details: newRegistrationDetails) => void;
}) => {
  return (
    <Card
      classNames={{
        header: ["flex justify-center font-bold"],
        body: [
          styles["merchant-registration-card-grid"],
          "break-all",
          "items-center",
        ],
        footer: ["flex", "justify-end", "gap-3"],
      }}
    >
      <CardHeader>{details.name}</CardHeader>
      <CardBody>
        <div>
          <ImageComponent
            src={details.photo}
            height={200}
            width={200}
            alt="Category image"
          />
        </div>
        <div>
          <div>
            <span className="font-bold">Owner</span> - {details?.user?.name}
          </div>
          <div className="font-bold">Business Description</div>
          <div>{details.description}</div>
        </div>
      </CardBody>
      <CardFooter>
        <Button
          variant="ghost"
          color="primary"
          onPress={() => setSelectedCard(details)}
          startContent={<CiViewList className="scale-[1.5]" />}
        >
          View Details
        </Button>
        <ApproveRegistrationBtn details={details} />
      </CardFooter>
    </Card>
  );
};
