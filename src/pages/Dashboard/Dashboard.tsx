import React from "react";
import Heading from "@/components/layout/Heading";
import TopSize from "./components/TopSize";
import TopColor from "./components/TopColor";
import AlmostOutStockProduct from "./components/AlmostOutStockProduct";

const Dashboard: React.FC = () => {
  return (
    <>
      {" "}
      <Heading title="Bảng điều khiển" hasBreadcrumb />
      <AlmostOutStockProduct />
      <TopSize />
      <TopColor />
    </>
  );
};

export default Dashboard;
