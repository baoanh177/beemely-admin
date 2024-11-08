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
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ text, color }) => {
  let className = "";

  switch (color) {
    case "orange":
      className = "bg-orange-50 text-orange-500";
      break;
    case "blue":
      className = "bg-cyan-50 text-cyan-500";
      break;
    case "green":
      className = "bg-green-50 text-green-600";
      break;
    case "green-capital":
      className = "bg-green-100 text-green-900 capitalize";
      break;
    case "gray":
      className = "bg-gray-50 text-gray-500";
      break;
    case "red":
      className = "bg-red-50 text-red-500";
      break;
    case "yellow":
      className = "capitalize bg-yellow-50 text-yellow-500";
      break;
    case "black":
      className = "capitalize bg-black-50 text-black-500";
      break;
    case "purple":
      className = "capitalize bg-[#F4ECFB] text-[#883DCF]";
      break;
    case "lightblue":
      className = "bg-blue-50 text-blue-500";
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
