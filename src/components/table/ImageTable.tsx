import React, { useState, useEffect } from "react";
import { Card, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Text } = Typography;

interface ImageTableProps {
  imageSrc?: string;
  title: string;
  description: string;
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
    <Card className="custom-image-table">
      <Meta
        className="custom-meta"
        avatar={
          !imgError && imageSrc ? (
            <Avatar src={imageSrc} onError={handleImageError} className="custom-avatar" />
          ) : (
            <Avatar icon={<UserOutlined />} className="custom-avatar" />
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
