import React from "react";
import { IconType } from "react-icons";
import RoundedIcon from "./RoundedIcon";

export interface InfoCardWithIconProps {
  icon: IconType;
  label?: string;
  title: string;
  value?: string;
}

const InfoCardWithIcon: React.FC<InfoCardWithIconProps> = ({ icon, label, title, value }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <RoundedIcon icon={icon} shape="circle" size="large" />
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
