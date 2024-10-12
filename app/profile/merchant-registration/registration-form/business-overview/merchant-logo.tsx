import { useContext, useEffect } from "react";
import { CustomImagePreviewer } from "@/app/_custom-components";
import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { setNestedPath } from "@/app/_utils";
import { setMerchantDetails } from "@/lib/profile/slices/merchant-details.slice";
import { uploadMerchantLogo } from "../utils";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";
import { MainProfileStateContext } from "@/app/profile/utils";

const MerchantLogo = () => {
  const mainContext = useContext(MainProfileStateContext);
  const showImage = useProfileSelector(
    (state) => state.merchantDetails.showImage,
  );
  const showImgChangeBtn = useProfileSelector(
    (state) => state.merchantDetails.showImgChangeBtn,
  );
  const imgSrc = useProfileSelector((state) => state.merchantDetails.photo);
  const registrationStatus = useProfileSelector(
    (state) => state.merchantDetails.registrationStatus,
  );
  const showUpdateSaveImgBtn = useProfileSelector(
    (state) => state.merchantDetails.showUpdateSaveImgBtn,
  );
  const dispatch = useProfileDispatch();

  const dispatchMerchantDetails = (details: object) => {
    dispatch(setMerchantDetails(details));
  };

  useEffect(() => {
    if (registrationStatus === merchantRegistrationStatus.adminReview) {
      dispatchMerchantDetails({
        showImgChangeBtn: false,
      });
      return;
    }
    dispatchMerchantDetails({
      showImgChangeBtn: true,
    });
  }, [registrationStatus, dispatch]);

  if (!mainContext) return null;
  const { config, setConfig } = mainContext;

  return (
    <CustomImagePreviewer
      showImage={showImage}
      showImgChangeBtn={showImgChangeBtn}
      imgSrc={imgSrc}
      height={200}
      width={200}
      imgAlt="Business Image"
      imgInputProps={{
        setUpload: setNestedPath(setConfig)("businessRegistrationFile"),
        value: config.businessRegistrationFile,
        dataUploadId: "merchant-overview-image",
        options: {
          text: {
            label: `Upload business logo`,
          },
        },
        imgChangeCallback: () => {
          dispatchMerchantDetails({
            showUpdateSaveImgBtn: true,
          });
        },
        clearCallback: () => {
          dispatchMerchantDetails({
            showUpdateSaveImgBtn: false,
          });
        },
      }}
      openInput={() => {
        dispatchMerchantDetails({
          showImage: false,
          showUpdateSaveImgBtn: false,
        });
      }}
      cancelUpload={() => {
        dispatchMerchantDetails({
          showImage: true,
          showUpdateSaveImgBtn: false,
        });
        config.businessRegistrationFile?.resetPreviewPanel();
      }}
      uploadFile={() => {
        const file = config.businessRegistrationFile?.cachedFileArray[0];
        file &&
          uploadMerchantLogo(file, (details) => {
            dispatchMerchantDetails({
              ...details,
              showImage: true,
              showUpdateSaveImgBtn: false,
            });
            config.businessRegistrationFile?.resetPreviewPanel();
          });
      }}
      showUpdateSaveImgBtn={showUpdateSaveImgBtn}
    />
  );
};

export default MerchantLogo;
