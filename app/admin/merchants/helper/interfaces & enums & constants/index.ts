import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";

export * from "./tabs";
export * from "./merchant-registration";
export * from "./merchant-list";

export const getMerchantRegistrationStatusLabel = (
  status?: merchantRegistrationStatus | null,
  isMerchantBanned?: boolean,
) => {
  if (!status) return "Not started yet";
  if (isMerchantBanned) return "Blocked";
  return status === merchantRegistrationStatus.adminReview
    ? "Under review"
    : "Completed";
};
