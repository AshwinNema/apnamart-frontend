import { Fragment, useContext, useEffect, useRef } from "react";
import { MainContext, ProductImgContext } from "../../helpers";
import { produce } from "immer";
import useConfigManager from "./useConfigManager";
import { ProductImg } from "./product-img";
import styles from "./styles.module.css";
import { ProductSlideImages } from "./product-slide-images";

export const ProductImages = () => {
  const [config, setConfig, containerRef] = useConfigManager();
  const mainContext = useContext(MainContext);
  if (!mainContext) return null;

  const { details } = mainContext.config;
  if (!details) return null;

  return (
    <>
      <ProductImgContext.Provider value={{ config, setConfig }}>
        <div className="relative overflow-hidden m-0">
          <div className="relative overflow-hidden m-0 ">
            <div className="relative w-full h-[50svh] flex">
              <ProductSlideImages photos={details.photos} />
              <div
                className={`h-[50svh] flex flex-col m-auto w-full  ${styles["slider-wrapper"]} overflow-hidden`}
              >
                <ul
                  ref={containerRef}
                  style={config.itemListStyle}
                  className={`m-0 p-0 flex relative w-full ${styles["animated"]} `}
                >
                  {details.photos.map((details, index) => {
                    return (
                      <Fragment key={details.cloudinary_public_id}>
                        <ProductImg index={index} details={details} />
                      </Fragment>
                    );
                  })}
                </ul>
              </div>
            </div>

            <ul className="mt-5 min-w-full flex justify-center gap-3 relative bottom-0">
              {details.photos.map(({ cloudinary_public_id }, index) => {
                return (
                  <li
                    className={`h-[0.5rem] cursor-pointer rounded-full ${index === config.curImgIndex ? "w-[1rem] bg-[grey]" : "w-[0.5rem] bg-[darkgrey]"} relative`}
                    key={cloudinary_public_id}
                    onClick={() => {
                      setConfig(
                        produce((draft) => {
                          draft.curImgIndex = index;
                        }),
                      );
                    }}
                  ></li>
                );
              })}
            </ul>
          </div>
        </div>
      </ProductImgContext.Provider>
    </>
  );
};
