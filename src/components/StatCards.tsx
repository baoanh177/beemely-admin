import clsx from "clsx";
import React from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
interface IStatsCardProps {
  title: string;
  value: string | number;
  percentageChange: number;
  changeValue: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<IStatsCardProps> = ({ title, value, percentageChange, changeValue, icon }) => {
  const isPositive = percentageChange >= 0;
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4 rounded-xl bg-[#fff] p-5">
        <div className="flex gap-4">
          <div className="flex w-full flex-col gap-2">
            <h4 className="text-l-medium text-black-300">{title}</h4>
            <div className="display-m-seibold text-black-500">{value}</div>
          </div>
          {icon}
        </div>
        <div className="flex gap-1">
          <div className={clsx("text-m-bold flex items-center", isPositive ? "text-green-600" : "text-red-600")}>
            {percentageChange}% {isPositive ? <GoTriangleUp /> : <GoTriangleDown />}
          </div>
          <div className="text-m-medium text-gray-400">{changeValue}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
