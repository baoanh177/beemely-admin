import React, { useState, useEffect } from "react";
import { Card, Avatar, Typography } from "antd";

const { Meta } = Card;
const { Text } = Typography;

interface ImageTableProps {
  imageSrc: string;
  title: string;
  description?: string;
}
const defaultImageSrc = "https://t3.ftcdn.net/jpg/02/97/73/42/360_F_297734214_IbEci8CMShXg0L71F9YRYhJclm7E7LFG.jpg";
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
    <Card className="custom-image-table">
      <Meta
        className="custom-meta"
        avatar={
          imgError || !imageSrc ? (
            <Avatar src={defaultImageSrc} className="custom-avatar" />
          ) : (
            <Avatar src={imageSrc} onError={handleImageError} className="custom-avatar" />
          )
        }
        title={<Text className="custom-description">{title}</Text>}
        description={
          <Text className="custom-description" type="secondary">
            {description}
          </Text>
        }
      />
    </Card>
  );
};

export default ImageTable;
