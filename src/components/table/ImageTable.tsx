import React, { useState, useEffect } from "react";
import { Card, Avatar, Typography } from "antd";
import imageError from "@/assets/images/imgError-table.jpg";

const { Meta } = Card;
const { Text } = Typography;

interface ImageTableProps {
  imageSrc: string;
  title: string;
  description?: string;
}

const ImageTable: React.FC<ImageTableProps> = ({ imageSrc, title, description }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [imageSrc]);

  const handleImageError = () => {
    setImgError(true);
    return true;
  };

  return (
    <div className="flex items-center p-4">
      <Meta
        className="flex items-center gap-[8px]"
        avatar={
          imgError || !imageSrc || imageSrc.trim() === "" ? (
            <Avatar src={imageError} className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg" />
          ) : (
            <Avatar src={imageSrc} onError={handleImageError} className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg" />
          )
        }
        title={<Text className="text-m-medium">{title}</Text>}
        description={
          <Text className="text-s-regular text-gray-500" type="secondary">
            {description}
          </Text>
        }
      />
    </div>
  );
};

export default ImageTable;
