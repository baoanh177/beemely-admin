import React from "react";
import { IItemsOderInfoCard } from "./OrderInforCard";

const InfoCardWithIcon: React.FC<{ item: IItemsOderInfoCard }> = ({ item }) => {
  const ItemIcon = item.icon;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-circle bg-gray-50">
          <div className="text-xl-medium text-gray-500">{ItemIcon && <ItemIcon />}</div>
        </div>
        <div className="text-m-medium">
          <div className="text-gray-500">{item.label}</div>
          {item.title}
        </div>
      </div>
      <div className="text-m-medium">{item.value}</div>
    </div>
  );
};

export default InfoCardWithIcon;
