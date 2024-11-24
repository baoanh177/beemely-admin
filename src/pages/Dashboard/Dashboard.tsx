import React from "react";
import Heading from "@/components/layout/Heading";
import TopSize from "./components/TopSize";
import TopColor from "./components/TopColor";
import AlmostOutStockProduct from "./components/AlmostOutStockProduct";
import LatestReviewsStats from "./components/LatestReviewsStats";
import OrderStatusCount from "./components/OrderStatusCount";

const Dashboard: React.FC = () => {
  return (
    <>
      <Heading title="Bảng điều khiển" hasBreadcrumb />
      <OrderStatusCount />
      <AlmostOutStockProduct />
      <TopSize />
      <TopColor />
      <LatestReviewsStats />
    </>
  );
};

export default Dashboard;
