import {
  uploadImgProps,
} from "@/app/merchant/products/helpers";
import { Button, Tooltip } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { produce } from "immer";
import { ImageComponent } from "@/app/_custom-components";
import { RiDeleteBin6Fill } from "react-icons/ri";

export const UploadedImg = ({
  imgDetails,
  index,
  setConfig,
  takeAction,
  config,
}: uploadImgProps) => {
  const width = config.itemLeft[1] - config.itemLeft[0];
  const containerRef = useRef<null | HTMLDivElement>(null);
  const hasIntersected = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const { isIntersecting } = entries[0];
        hasIntersected.current = isIntersecting;
        setTimeout(() => {
          let bounds: DOMRect | null = null;
          if (containerRef.current) {
            bounds = containerRef.current.getBoundingClientRect();
          }
          bounds &&
            takeAction({
              type: "img intersection",
              details: {
                isIntersecting: hasIntersected.current,
                bounds,
              },
            });
        }, 400);
      },
      {
        threshold: 1,
      },
    );
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [index]);

  return (
    <div
      className={`flex gap-3 items-center min-w-[250px]`}
      ref={containerRef}
    >
      <ImageComponent
        src={imgDetails.url}
        width={200}
        height={200}
        alt="Uploaded image"
      />
      <Tooltip color="danger" content="Remove uploaded image">
        <Button
          onPress={() => {
            setConfig(
              produce((draft) => {
                const lastIndex = draft.uploadedImgs.length - 1;
                draft.deletedImgs.push(imgDetails);
                draft.uploadedImgs = draft.uploadedImgs.filter(
                  (newUploadedImgDetails) =>
                    imgDetails.cloudinary_public_id !==
                    newUploadedImgDetails.cloudinary_public_id,
                );
                draft.lastVisibleUploadIndex = Math.min(
                  draft.lastVisibleUploadIndex,
                  lastIndex,
                );
                draft.lastVisibleUploadIndex = Math.max(
                  draft.lastVisibleUploadIndex,
                  0,
                );

                if (lastIndex === draft.lastVisibleUploadIndex) {
                  draft.translateUploadImgsX = Math.max(
                    draft.translateUploadImgsX - width,
                    0,
                  );
                  draft.lastVisibleUploadIndex -= 1
                }
              }) ,
            );
          }}
          isIconOnly={true}
          className="bg-transparent"
        >
          <RiDeleteBin6Fill className="fill-dangerTheme scale-[1.3]" />
        </Button>
      </Tooltip>
    </div>
  );
};
