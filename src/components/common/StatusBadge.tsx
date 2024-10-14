import React from "react";
import clsx from "clsx";
export type StatusBadgeColors = "blue" | "green" | "orange" | "gray" | "red";
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
    case "gray":
      className = "bg-gray-50 text-gray-500";
      break;
    case "red":
      className = "bg-red-50 text-red-500";
      break;
    default:
      className = "";
      break;
  }

  return <div className={clsx(className, "text-m-semibold inline-block rounded-lg border-none px-[10px] py-1 text-center text-nowrap")}>{text}</div>;
};

export default StatusBadge;
