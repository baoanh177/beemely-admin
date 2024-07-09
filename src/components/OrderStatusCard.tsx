import React from "react";
import { Steps } from "antd";
import RoundedIcon, { IRoundIcon } from "./RoundedIcon";
import { BsCartCheck, BsClockHistory } from "react-icons/bs";
import { IoBagAddOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { CiViewList } from "react-icons/ci";

interface IItemSteps {
  title: string;
  description?: string;
  date: string;
  icons: IRoundIcon[];
}

interface OrderStatusCardProps {
  itemSteps: IItemSteps[];
  currentStep: number;
}

export const stepsData: IItemSteps[] = [
  {
    title: "Step 1",
    description: "This is a description for Step 1.",
    date: "12/12/2022, 03:00",
    icons: [{ icon: BsCartCheck, size: "large", shape: "circle" }],
  },
  {
    title: "Step 2",
    description: "This is a description for Step 2.",
    date: "12/12/2022, 03:00",

    icons: [{ icon: BsClockHistory, size: "large", shape: "circle" }],
  },
  {
    title: "Step 3",
    description: "This is a description for Step 3.",
    date: "12/12/2022, 03:00",
    icons: [{ icon: IoBagAddOutline, size: "medium", shape: "circle" }],
  },
  {
    title: "Step 4",
    description: "This is a description for Step 4.",
    date: "12/12/2022, 03:00",
    icons: [{ icon: LiaShippingFastSolid, size: "medium", shape: "circle" }],
  },
  {
    title: "Step 5",
    description: "This is a description for Step 5.",
    date: "12/12/2022, 03:00",
    icons: [{ icon: CiViewList, size: "medium", shape: "circle" }],
  },
];

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({ itemSteps, currentStep }) => {
  return (
    <Steps className="text-l-medium w-full rounded-lg bg-white p-6" direction="vertical" current={currentStep}>
      {itemSteps.map((itemStep, index) => {
        let status: "wait" | "process" | "finish" = "wait";
        if (index < currentStep) {
          status = "finish";
        } else if (index === currentStep) {
          status = "process";
        }
        return (
          <Steps.Step
            key={index}
            title={<div className="text-l-medium">{itemStep.title}</div>}
            description={
              <div className="flex flex-col gap-2">
                <div className="text-black-400">{itemStep.description}</div>
                <div className="text-m-regular text-gray-400">{itemStep.date}</div>
              </div>
            }
            status={status}
            icon={itemStep.icons.map((icon, index) => (
              <div key={index} className="flex flex-col items-center">
                <RoundedIcon
                  key={index}
                  icon={icon.icon}
                  color={status === "process" || status === "finish" ? "primary" : "gray"}
                  size={icon.size}
                  shape={icon.shape}
                />
              </div>
            ))}
          />
        );
      })}
    </Steps>
  );
};

export default OrderStatusCard;
