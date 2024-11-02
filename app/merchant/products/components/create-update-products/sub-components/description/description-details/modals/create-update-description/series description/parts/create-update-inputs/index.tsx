import { ImgPreviewInput, TextInput } from "@/app/_custom-components";
import { setNestedPath } from "@/app/_utils";
import * as _ from "lodash";
import { NonTextSeriesInput, RestoreUploadedImage } from "./sub-parts";
import { useContext, useEffect, useRef } from "react";
import {
  CreateUpdateDescriptionContext,
  seriesDescription,
} from "@/app/merchant/products/helpers";
import { FileUploadWithPreview } from "file-upload-with-preview";

export const AddDescriptionSeriesInputs = ({
  onAdd,
}: {
  onAdd: (key: string, val: string) => void;
}) => {
  const mainDescriptionContext = useContext(CreateUpdateDescriptionContext);
  const imgInputRef = useRef<FileUploadWithPreview | null>(null);
  useEffect(() => {
    if (
      !mainDescriptionContext?.descriptionEventsEmitter ||
      !imgInputRef.current
    )
      return;
    const subscription =
      mainDescriptionContext.descriptionEventsEmitter.subscribe((event) => {
        if (event.type === "add file") {
          imgInputRef.current?.addFiles([event.data]);
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [mainDescriptionContext?.descriptionEventsEmitter]);

  if (!mainDescriptionContext) return null;
  const { config, setConfig } = mainDescriptionContext;
  const seriesDetails = config.details as seriesDescription;
  return (
    <>
      <div className={`${!config.enableHeader && "invisible"}`}>
        <TextInput
          fullWidth={true}
          value={
            typeof config.details !== "string"
              ? (config?.details?.header as string)
              : ""
          }
          setData={setNestedPath(setConfig)("details.header")}
          label="Feature Header"
          placeholder="Feature Header"
        />
      </div>
      {config.seriesDescriptionType !== "text" ? (
        <NonTextSeriesInput setData={setNestedPath(setConfig)} onAdd={onAdd} />
      ) : null}
      {config.enablePhoto && !seriesDetails?.uploadedImg && (
        <>
          <RestoreUploadedImage
            deletedUploadedImg={seriesDetails.deletedUploadedImg}
            setConfig={setConfig}
          />
          <ImgPreviewInput
            setUpload={(upload) => {
              imgInputRef.current = upload;
            }}
            dataUploadId="description input"
            imgChangeCallback={(e) => {
              setNestedPath(setConfig)("details.photo")(e.cachedFileArray?.[0]);
            }}
            imgDeletedCallBack={() => {
              setNestedPath(setConfig)("details.photo")();
            }}
            options={{
              text: {
                label: "Upload description pointer image",
              },
            }}
          />
        </>
      )}
    </>
  );
};
