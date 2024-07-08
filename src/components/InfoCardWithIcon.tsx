import React from "react";
import { IconType } from "react-icons";

interface InfoCardWithIconProps {
  icon: IconType;
  label?: string;
  title: string;
  value?: string;
}

const InfoCardWithIcon: React.FC<InfoCardWithIconProps> = ({ icon: ItemIcon, label, title, value }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50">
          <div className="text-xl text-gray-500">{ItemIcon && <ItemIcon />}</div>
        </div>
        <div className="text-m-medium">
          <div className="text-gray-500">{label}</div>
          {title && <div>{title}</div>}
        </div>
      </div>
      <div className="text-m-medium">{value}</div>
    </div>
  );
};

export default InfoCardWithIcon;
