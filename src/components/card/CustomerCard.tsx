import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import StatusBadge, { StatusBadgeProps } from "../common/StatusBadge";
import CustomerAvatar from "../common/CustomerAvatar";

interface CustomerCardProps {
  image: string;
  username: string;
  status: StatusBadgeProps;
  orders: number;
  balance: number;
  onClick?: () => void
}

const CustomerCard: React.FC<CustomerCardProps> = ({ image, username, status, orders, balance, onClick }) => {
  console.log("🦎 ~ username:", username)
  return (
    <div
      className="flex w-[216px] shrink-0 cursor-pointer flex-col gap-8 rounded-xl border-2 
      border-transparent bg-white p-4 transition-colors hover:border-primary-400"
      onClick={() => onClick && onClick()}
    >
      <div className="flex flex-1 flex-col items-center gap-4">
        <div className="relative flex w-full items-center justify-center">
          <div>
            <CustomerAvatar size="medium" src={image} alt={username} />
          </div>
          <div className="absolute right-0 top-0 cursor-pointer text-gray-400 hover:text-black-500">
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="flex h-12 w-full flex-col items-center gap-1">
          <div className="text-m-semibold text-center">{username}</div>
          <StatusBadge text={status.text} color={status.color} />
        </div>
      </div>
      <hr className="border-dashed"></hr>
      <div className="flex h-[42px] w-full items-center justify-between gap-[10px]">
        <div className="flex w-full flex-col items-center justify-center gap-1">
          <span className="text-s-regular text-gray-500">Orders</span>
          <span className="text-m-medium">{orders}</span>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-1">
          <span className="text-s-regular text-gray-500">Balance</span>
          <span className="text-m-medium">${balance}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
