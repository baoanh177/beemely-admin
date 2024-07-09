import React, { useEffect, useState } from "react";
import imageError from "@/assets/images/imgError-table.jpg";
import clsx from "clsx";
import imgFbDefault from "@/assets/images/customerDefaultAvatar.png";
interface CustomerAvatarProps {
  src?: string;
  alt: string;
  className?: string;
  size?: "large" | "medium";
}

const CustomerAvatar: React.FC<CustomerAvatarProps> = ({ size = "medium", src, alt, className }) => {
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
      className={clsx("rounded-circle object-cover", className, {
        "h-[148px] w-[148px]": size === "large",
        "h-[80px] w-[80px]": size === "medium",
      })}
      onError={handleError}
    />
  );
};

export default CustomerAvatar;
