import { Button, ConfigProvider } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { ReactNode } from "react";

type ButtonType = "primary" | "default" | "link";

interface ICustomButtonProps {
  type?: ButtonType;
  size?: SizeType;
  text: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  isBlock?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const CustomButton = ({
  type = "default",
  size = "middle",
  text,
  startContent,
  endContent,
  onClick,
  isBlock = false,
  isDisabled = false,
  isLoading = false,
}: ICustomButtonProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#000000",
            colorPrimaryHover: "#000000cc",
            colorPrimaryActive: "#000000cc",
            colorPrimaryBorder: "#000000cc",
          },
        },
      }}
    >
      <Button
        type={type}
        size={size}
        block={isBlock}
        disabled={isDisabled}
        loading={isLoading}
        className="flex items-center justify-center gap-1"
        onClick={() => onClick && onClick()}
      >
        <span>{startContent}</span>
        <span>{text}</span>
        <span>{endContent}</span>
      </Button>
    </ConfigProvider>
  );
};

export default CustomButton;
