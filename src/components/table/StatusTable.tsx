import React from "react";
import { Tag } from "antd";

interface StatusTableProps {
  text: string;
  type: "processing" | "shipped" | "delivered";
}

const StatusTable: React.FC<StatusTableProps> = ({ text, type }) => {
  let className = "";

  switch (type) {
    case "processing":
      className = "custom-processing";
      break;
    case "shipped":
      className = "custom-shipped";
      break;
    case "delivered":
      className = "custom-delivered";
      break;
    default:
      className = "";
      break;
  }

  return <Tag className={className}>{text}</Tag>;
};

export default StatusTable;
