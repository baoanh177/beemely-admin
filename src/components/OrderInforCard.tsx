import React from "react";
import StatusBadge, { StatusBadgeProps } from "./table/StatusBadge";
import { IconType } from "react-icons";
import { IoBagOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { LiaShippingFastSolid } from "react-icons/lia";
import InfoCardWithIcon from "./InfoCardWithIcon";

export interface IItemsOderInfoCard {
  label?: string;
  value?: string;
  icon: IconType;
  title: string;
}
interface IOrderInforCardProps {
  title: string;
  icon?: IconType;
  status?: StatusBadgeProps;
  items: IItemsOderInfoCard[];
}
export const dataItemsOrderInforCard: IItemsOderInfoCard[] = [
  {
    icon: IoBagOutline,
    title: "Added",
    value: "12 Dec 2022",
  },
  {
    icon: CiCalendarDate,
    title: "Payment Method",
    value: "Visa",
  },
  {
    icon: LiaShippingFastSolid,
    title: "Shipping Method",
    value: "Flat Shipping",
  },
];

const OrderInforCard: React.FC<IOrderInforCardProps> = ({ title, icon: TitleIcon, status, items }) => {
  return (
    <div className="flex w-full flex-col gap-5 rounded-xl bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="text-m-semibold flex items-center gap-2">
            <div>{title}</div>
          </div>
          {status && <StatusBadge {...status} />}
        </div>
        <div className="cursor-pointer text-gray-400">{TitleIcon && <TitleIcon />}</div>
      </div>
      {items.map((item, index) => (
        <InfoCardWithIcon key={index} {...item} />
      ))}
    </div>
  );
};

export default OrderInforCard;
