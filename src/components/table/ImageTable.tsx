import React, { useState, useEffect } from "react";
import imageError from "@/assets/images/imgError-table.jpg";
import imgEmpty from "@/assets/images/image-empty.png";

interface ImageTableProps {
  imageSrc?: string;
  title: string;
  description?: string;
}

const ImageTable: React.FC<ImageTableProps> = ({ imageSrc, title, description }) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!imageSrc || imageSrc.trim() === "") {
      setImgSrc(imgEmpty);
    } else {
      setImgSrc(imageSrc);
    }
  }, [imageSrc]);

  const handleError = () => {
    setImgSrc(imageError);
  };

  return (
    <div className="flex items-center gap-2">
      {!imgSrc ? (
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50">
          <span className="text-m-medium text-gray-400">{title[0]}</span>
        </div>
      ) : (
        <img src={imgSrc} onError={handleError} className="h-11 w-11 rounded-lg bg-gray-50 object-cover" alt="" />
      )}
      <div className="flex flex-col gap-1">
        <div className="text-m-medium text-black-500">{title}</div>
        <div className="text-s-regular text-gray-500">{description}</div>
      </div>
    </div>
  );
};

export default ImageTable;
