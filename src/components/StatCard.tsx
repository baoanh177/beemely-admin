// StatCard.tsx
import React from "react";
import { FaShoppingCart, FaDollarSign, FaTrophy } from "react-icons/fa";

interface StatCardProps {
  title: string;
  value: string | number;
  percentageChange: number;
  changeValue: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, percentageChange, changeValue, icon }) => {
  const isPositive = percentageChange >= 0;
  return (
    <div className="mx-2 flex-1 rounded-lg bg-white p-4 text-center shadow-md">
      <div className="mb-2 text-4xl">{icon}</div>
      <h4 className="text-sm text-gray-500">{title}</h4>
      <div className="my-2 text-2xl font-bold">{value}</div>
      <div className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
        {percentageChange}% {isPositive ? "▲" : "▼"} {changeValue}
      </div>
    </div>
  );
};

const StatCards: React.FC = () => {
  const stats = [
    {
      title: "Total Orders",
      value: 2400,
      percentageChange: 1,
      changeValue: "+24 this month",
      icon: <FaShoppingCart />,
    },
    {
      title: "Total Balance",
      value: "$100.00",
      percentageChange: 10,
      changeValue: "+$10 today",
      icon: <FaDollarSign />,
    },
    {
      title: "Reward Points",
      value: 1200,
      percentageChange: 10,
      changeValue: "+120 today",
      icon: <FaTrophy />,
    },
  ];

  return (
    <div className="flex justify-around">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          percentageChange={stat.percentageChange}
          changeValue={stat.changeValue}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default StatCards;
