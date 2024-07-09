import React from "react";
import { FaShoppingCart, FaTrophy, FaMoneyBill } from "react-icons/fa";
import RoundedIcon from "./RoundedIcon";

interface StatCardProps {
  stats: {
    title: string;
    value: string | number;
    percentageChange: number;
    changeValue: string;
    icon: React.ReactNode;
  }[];
}

const StatCards: React.FC<StatCardProps> = ({ stats }) => {
  return (
    <div className="flex gap-4">
      {stats.map((stat, index) => {
        const isPositive = stat.percentageChange >= 0;
        return (
          <div key={index}>
            <div className="flex flex-col gap-4 rounded-xl bg-[#fff] p-5">
              <div className="flex gap-4">
                <div className="flex w-[140px] flex-col gap-2">
                  <h4 className="text-l-medium h-6 text-black-300">{stat.title}</h4>
                  <div className="display-m-seibold h-8 font-semibold">{stat.value}</div>
                </div>
                <div>{stat.icon}</div>
              </div>
              <div className="flex h-5 gap-1">
                <span className="font-bold text-green-600">
                  {stat.percentageChange}% {isPositive ? "▲" : "▼"}
                </span>
                <div className="text-m-medium text-gray-400">{stat.changeValue}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const App: React.FC = () => {
  const stats = [
    {
      title: "Total Orders",
      value: 2400,
      percentageChange: 1,
      changeValue: "+24 this month",
      icon: <RoundedIcon icon={FaShoppingCart} color="orange" size="large" shape="square" />,
    },
    {
      title: "Total Balance",
      value: "$100.00",
      percentageChange: 10,
      changeValue: "+$10 today",
      icon: <RoundedIcon icon={FaMoneyBill} color="primary" size="large" shape="square" />,
    },
    {
      title: "Reward Points",
      value: 1200,
      percentageChange: 10,
      changeValue: "+120 today",
      icon: <RoundedIcon icon={FaTrophy} color="green" size="large" shape="square" />,
    },
  ];

  return <StatCards stats={stats} />;
};

export default App;
