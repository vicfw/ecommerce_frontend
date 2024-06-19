import Image from "next/image";
import React from "react";

type ImageVariantProps = {
  src: string;
  alt: string;
};

export const ImageVariant = (props: ImageVariantProps) => {
  const { src, alt } = props;
  return (
    <div className="border flex justify-center items-center rounded-lg p-3 w-[90px] h-[90px] cursor-pointer">
      <div className="relative w-full h-full">
        <Image fill alt={alt} src={src} style={{ objectFit: "contain" }} />
      </div>
    </div>
  );
};
