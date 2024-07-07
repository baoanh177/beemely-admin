import React from "react";
import StatusBadge, { StatusBadgeProps } from "./table/StatusBadge";
import { IconType } from "react-icons";
import { IoBagOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiNotePencilLight } from "react-icons/pi";

interface IItems {
  label: string;
  value: string;
  icons: IconType;
}

interface ITitle {
  id?: string;
  title: string;
  icons?: IconType;
  status?: StatusBadgeProps;
}

interface IOrderInfor {
  title: ITitle;
  items: IItems[];
}
export const dataOderInforCard: IOrderInfor[] = [
  {
    title: {
      id: "#302011",
      title: "Order ",
      icons: PiNotePencilLight,
      status: { color: "orange", text: "Processing" },
    },
    items: [
      {
        icons: IoBagOutline,
        label: "Added",
        value: "12 Dec 2022",
      },
      {
        icons: CiCalendarDate,
        label: "Payment Method",
        value: "Visa",
      },
      {
        icons: LiaShippingFastSolid,
        label: "Shipping Method",
        value: "Flat Shipping",
      },
    ],
  },
];
const OrderInForCard: React.FC<IOrderInfor> = ({ title, items }) => {
  return (
    <div className="flex w-[360px] flex-col gap-5 rounded-xl bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="text-xl-semibold flex items-center gap-2">
            <div className="">{title.title}</div>
            <div> {title.id}</div>
          </div>
          {title.status && <StatusBadge {...title.status} />}
        </div>
        <div className="cursor-pointer text-gray-400"> {title.icons && <title.icons />}</div>
      </div>
      {items.map((item: IItems, index: number) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-circle bg-gray-50">
              <div className="text-xl-medium text-gray-500">{item.icons && <item.icons />}</div>
            </div>
            <div className="text-m-medium">{item.label}</div>
          </div>
          <div className="text-m-medium">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default OrderInForCard;
