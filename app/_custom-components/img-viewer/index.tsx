import { useEffect, useRef } from "react";

export const ImgViewer = ({ file }: { file: File }) => {
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!imgContainerRef.current) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (file.type.startsWith("image/")) {
        if (!imgContainerRef.current) return;
        imgContainerRef.current.style.backgroundImage = `url("${fileReader.result}")`;
      }
    };
  }, []);
  return (
    <div className="w-100 h-full min-h-[200px]" ref={imgContainerRef}></div>
  );
};
