import {
  useEffect,
  useRef,
  useContext,
  useCallback,
  MutableRefObject,
} from "react";
import {
  deletedImgProps,
  ProductImgsModalContext,
} from "@/app/merchant/products/helpers";
import { errorToast } from "@/app/_utils";
import { produce } from "immer";

const useConfigManager = (
  config: deletedImgProps["config"],
  containerRef:MutableRefObject<null | HTMLDivElement>,
  handleImageIntersection: deletedImgProps["handleImageIntersection"],
  index: deletedImgProps["index"],
  imageDetails: deletedImgProps["imageDetails"],
): [() => void,] => {
  const width = config.itemLeft[1] - config.itemLeft[0];

  const hasIntersected = useRef(false);
  const modalContext = useContext(ProductImgsModalContext);

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
            handleImageIntersection(hasIntersected.current, bounds, index);
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

  const handleImgRestore = useCallback(() => {
    if (!modalContext) return;
    const totalLength =
      (modalContext.uploadRef.current?.cachedFileArray?.length || 0) +
      modalContext.config.uploadedImgs.length +
      modalContext.config.cachedFiles.length;

    if (totalLength >= 20) {
      errorToast({
        msg: "You cannot upload more than 4 images. To upload a new image, you will have to remove one of the images you are newly trying to upload",
      });
      return;
    }
    modalContext.setConfig(
      produce((draft) => {
        const lastIndex = draft.deletedImgs.length - 1;
        draft.uploadedImgs.push(imageDetails);
        draft.deletedImgs = draft.deletedImgs.filter(
          (newDeletedImgDetails) =>
            imageDetails.cloudinary_public_id !==
            newDeletedImgDetails.cloudinary_public_id,
        );
        draft.lastVisibleDeletedIndex = Math.min(
          draft.lastVisibleDeletedIndex,
          lastIndex,
        );
        draft.lastVisibleDeletedIndex = Math.max(
          draft.lastVisibleDeletedIndex,
          0,
        );
        if (draft.lastVisibleDeletedIndex === lastIndex) {
          draft.translateDeletedImgsX = Math.max(
            draft.translateDeletedImgsX - width,
            0,
          );
          draft.lastVisibleDeletedIndex -= 1;
        }
      }),
    );
  }, [modalContext, width]);
  return [handleImgRestore];
};

export default useConfigManager;
