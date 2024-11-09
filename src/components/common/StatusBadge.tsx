import React from "react";
import clsx from "clsx";
export type StatusBadgeColors =
  | "blue"
  | "green"
  | "orange"
  | "gray"
  | "red"
  | "yellow"
  | "green-capital"
  | "black"
  | "purple"
  | "lightblue"
  | "darkgreen";
export interface StatusBadgeProps {
  text: string;
  color: StatusBadgeColors;
  disabled?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ text, color, disabled = false }) => {
  let className = "";

  switch (color) {
    // case "orange":
    //   className = "bg-orange-50 text-orange-500";
    //   break;
    // case "blue":
    //   className = "bg-cyan-50 text-cyan-500";
    //   break;
    // case "green":
    //   className = "bg-green-50 text-green-600";
    //   break;
    // case "green-capital":
    //   className = "bg-green-100 text-green-900 capitalize";
    //   break;
    // case "gray":
    //   className = "bg-gray-50 text-gray-500";
    //   break;
    // case "red":
    //   className = "bg-red-50 text-red-500";
    //   break;
    // case "yellow":
    //   className = "capitalize bg-yellow-50 text-yellow-500";
    //   break;
    // case "black":
    //   className = "capitalize bg-black-50 text-black-500";
    //   break;
    // case "purple":
    //   className = "capitalize bg-[#F4ECFB] text-[#883DCF]";
    //   break;
    // case "lightblue":
    //   className = "bg-blue-50 text-blue-500";
    //   break;
    // case "darkgreen":
    //   className = "bg-green-700 text-green-100";
    //   break;
    case "orange":
      className = disabled ? "bg-orange-100 text-orange-300" : "bg-orange-50 text-orange-500";
      break;
    case "blue":
      className = disabled ? "bg-cyan-100 text-cyan-300" : "bg-cyan-50 text-cyan-500";
      break;
    case "green":
      className = disabled ? "bg-green-100 text-green-300" : "bg-green-50 text-green-600";
      break;
    case "green-capital":
      className = disabled ? "bg-green-200 text-green-700 capitalize" : "bg-green-100 text-green-900 capitalize";
      break;
    case "gray":
      className = disabled ? "bg-gray-100 text-gray-300" : "bg-gray-50 text-gray-500";
      break;
    case "red":
      className = disabled ? "bg-red-100 text-red-300" : "bg-red-50 text-red-500";
      break;
    case "yellow":
      className = disabled ? "bg-yellow-100 text-yellow-300 capitalize" : "bg-yellow-50 text-yellow-500 capitalize";
      break;
    case "black":
      className = disabled ? "bg-black-100 text-black-300 capitalize" : "bg-black-50 text-black-500 capitalize";
      break;
    case "purple":
      className = disabled ? "bg-[#E0D4F5] text-[#B08EDC] capitalize" : "bg-[#F4ECFB] text-[#883DCF] capitalize";
      break;
    case "lightblue":
      className = disabled ? "bg-blue-100 text-blue-300" : "bg-blue-50 text-blue-500";
      break;
    case "darkgreen":
      className = "bg-green-700 text-green-100";
      break;

    default:
      className = "";
      break;
  }

  return (
    <div className={clsx(className, "text-m-semibold inline-block text-nowrap rounded-lg border-none px-[10px] py-1 text-center")}>{text}</div>
  );
};

export default StatusBadge;
