import React from "react";
import Heading from "@/components/layout/Heading";
import TopSize from "./components/TopSize";
import TopColor from "./components/TopColor";
import AlmostOutStockProduct from "./components/AlmostOutStockProduct";
import LatestReviewsStats from "./components/LatestReviewsStats";
import TopBuyers from "./components/TopBuyers";

const Dashboard: React.FC = () => {
  return (
    <>
      <Heading title="Bảng điều khiển" hasBreadcrumb />
      <AlmostOutStockProduct />
      <TopSize />
      <TopColor />
      <LatestReviewsStats />
      <TopBuyers />
    </>
  );
};

export default Dashboard;
