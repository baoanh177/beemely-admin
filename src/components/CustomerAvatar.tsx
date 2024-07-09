import React, { useEffect, useState } from "react";
import imageError from "@/assets/images/imgError-table.jpg";
import clsx from "clsx";
import imgFbDefault from "@/assets/images/imgFbDefault.png"
interface CustomerAvatarProps {
  src?: string;
  alt: string;
  className?: string;
  size: "large" | "medium"
}

const CustomerAvatar: React.FC<CustomerAvatarProps> = ({ size, src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(src);

  useEffect(() => {
    if (!imageSrc || imageSrc.trim() === "") {
      setImageSrc(imgFbDefault);
    } else {
      setImageSrc(imageSrc);
    }
  }, [imageSrc]);

  const handleError = () => {
    setImageSrc(imageError);
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={clsx("rounded-full object-cover", className, {
        "w-[148px] h-[148px]": size === "large",
        "w-[80px] h-[80px]": size === "medium",
      })}
      onError={handleError}
    />
  )
};

export default CustomerAvatar;
