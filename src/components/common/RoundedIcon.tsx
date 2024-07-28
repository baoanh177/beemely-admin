import clsx from "clsx";
import { IconType } from "react-icons";

export interface IRoundIcon {
  icon: IconType;
  color?: "orange" | "primary" | "green" | "gray" | "red";
  size: "large" | "medium" | "filter";
  shape: "circle" | "square";
}

const RoundedIcon = ({ icon: ItemIcon, color, size, shape }: IRoundIcon) => {
  let colorClasses;
  switch (color) {
    case "orange":
      colorClasses = "bg-orange-50 text-orange-500";
      break;
    case "red":
      colorClasses = "bg-red-50 text-red-500";
      break;
    case "primary":
      colorClasses = "bg-primary-50 text-primary-500";
      break;
    case "green":
      colorClasses = "bg-green-50 text-green-600";
      break;
    default:
      colorClasses = "bg-gray-50 text-gray-500";
      break;
  }
  return (
    <div
      className={clsx(
        "flex shrink-0 items-center justify-center text-lg",
        {
          "rounded-full": shape === "circle",
          "rounded-lg": shape === "square",
        },
        colorClasses,
        size === "large" && "h-[40px] w-[40px]",
        size === "medium" && "h-[36px] w-[36px]",
        size === "filter" && "h-[40px] w-[48px]",
      )}
    >
      <ItemIcon />
    </div>
  );
};

export default RoundedIcon;
