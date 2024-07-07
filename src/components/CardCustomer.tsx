import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import StatusBadge, { StatusBadgeProps } from "./table/StatusBadge";
import CustomImage from "./CustomImage";

interface CustomerCardProps {
  image: string;
  title: string;
  status: StatusBadgeProps;
  orders: number;
  balance: number;
}

export const customerData: CustomerCardProps[] = [
  {
    image: "https://picsum.photos/200/300",
    title: "Laura Prichet",
    status: { text: "Blocked", color: "red" },
    orders: 23434,
    balance: 23434,
  },
  {
    image: "https://picsum.photos/200/300",
    title: "John Doe",
    status: { text: "Active", color: "green" },
    orders: 10000,
    balance: 5000,
  },
  {
    image: "https://picsum.photos/200/300defrgfds",
    title: "John Doe",
    status: { text: "Blocked", color: "red" },
    orders: 10000,
    balance: 5000,
  },
  {
    image: "",
    title: "John Doe",
    status: { text: "Active", color: "green" },
    orders: 10000,
    balance: 5000,
  },
];
const CustomerCard: React.FC<CustomerCardProps> = ({ image, title, status, orders, balance }) => {
  return (
    <div className="flex max-w-[216px] flex-col gap-8 rounded-xl bg-white p-4">
      <div className="flex flex-1 flex-col items-center gap-4">
        <div className="relative flex w-full items-center justify-center">
          <div>
            <CustomImage src={image} alt={title} className="h-20 w-20 rounded-circle object-cover" />
          </div>
          <div className="absolute right-0 top-0 text-gray-400">
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="flex h-12 w-full flex-col items-center gap-1">
          <div className="text-m-semibold">{title}</div>
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
