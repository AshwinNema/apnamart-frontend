import { HiLocationMarker } from "react-icons/hi";
import { FaCaretDown } from "react-icons/fa";
import dynamic from "next/dynamic";
import React from "react";
import { Spinner } from "..";

export function GlowingMarker() {
  return (
    <div className="scale-[3] relative">
      <div
        className={`absolute -left-[260%] bottom-[125%] text-[0.3rem] bg-[#ca8a04] w-[800%] p-1 animate-hideMarkerToolTip`}
      >
        <p>Your order will be delivered here</p>
        <p className="text-[0.2rem] flex justfy-center ml-[20%]">
          Move pin to your exact location
        </p>
        <FaCaretDown
          className={`absolute scale-[2] -bottom-[20%] left-[36%] fill-[#ca8a04] `}
        />
      </div>

      <div className={`relative animate-markerArrival`}>
        <HiLocationMarker className={`fill-mainTheme`} />
        <div
          className={`absolute scale-75 rounded-[50%] left-[35%] -bottom-[30%] bg-[black] z-0 h-1 w-1`}
        ></div>
        <div
          className={`w-[400%] h-[400%] rounded-[50%] absolute -bottom-[210%] -left-[150%] bg-transparent z-0 animate-glow`}
        ></div>
      </div>
    </div>
  );
}

export const MainMap = dynamic(
  () =>
    import("@/app/_custom-components/leaflet/map-component").then(
      (mod) => mod.MainMap,
    ),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);
