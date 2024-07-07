import React, { useEffect, useState } from "react";
import imageError from "@/assets/images/imgError-table.jpg";
import imgEmpty from "@/assets/images/image-empty.png";
interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(src);

  useEffect(() => {
    if (!imageSrc || imageSrc.trim() === "") {
      setImageSrc(imgEmpty);
    } else {
      setImageSrc(imageSrc);
    }
  }, [imageSrc]);

  const handleError = () => {
    setImageSrc(imageError);
  };

  return <img src={imageSrc} alt={alt} className={className} onError={handleError} />;
};

export default CustomImage;
