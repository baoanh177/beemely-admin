import { ReactNode } from "react";
import clsx from "clsx";

export interface IButtonProps {
  type?: "primary" | "ghost" | "secondary";
  text: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}

const Button = ({ type = "primary", text, isDisabled = false, isLoading = false, icon, onClick }: IButtonProps) => {
  const typeClass = {
    primary: "bg-primary-500 text-white",
    ghost: " text-primary-500 bg-primary-50",
    secondary: "text-gray-400 border border-gray-400",
  };

  const typeLoading = {
    primary: "border-white border-t-primary-500",
    ghost: "border-primary-500 border-t-primary-50",
    secondary: "border-gray-400 border-t-white",
  };

  return (
    <button
      onClick={() => {
        if (onClick && !isDisabled && !isLoading) onClick();
      }}
      className={clsx(
        "text-m-semibold flex items-center justify-center gap-1 rounded-[8px] px-[14px] py-[10px] transition-opacity",
        typeClass[type],
        {
          "cursor-not-allowed opacity-65": isDisabled,
          "opacity-65": isLoading,
          "cursor-pointer hover:opacity-95": !isDisabled && !isLoading,
        },
      )}
    >
      {isLoading ? <div className={clsx(`${typeLoading[type]} h-4 w-4 animate-spin rounded-full border-2`)} /> : icon}
      {text}
    </button>
  );
};

export default Button;
