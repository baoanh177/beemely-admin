import React from "react";

interface StatusTableProps {
  text: string;
  type: "processing" | "shipped" | "delivered";
}

const StatusTable: React.FC<StatusTableProps> = ({ text, type }) => {
  let className = "";

  switch (type) {
    case "processing":
      className = "w-[94px] h-[28px] bg-orange-50 text-orange-500";
      break;
    case "shipped":
      className = "w-[67px] h-[28px] bg-cyan-50 text-cyan-500";
      break;
    case "delivered":
      className = "w-[84px] h-[28px] bg-green-50 text-green-600";
      break;
    default:
      className = "";
      break;
  }

  return (
    <div className={`${className} font-ps-SemiBold flex items-center justify-center rounded-[8px] border-none p-[4px] px-[10px] text-[14px]`}>
      {text}
    </div>
  );
};

export default StatusTable;
