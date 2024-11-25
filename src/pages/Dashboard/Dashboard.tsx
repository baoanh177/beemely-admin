import Heading from "@/components/layout/Heading";
import React from "react";
import AlmostOutStockProduct from "./components/AlmostOutStockProduct";
import LatestReviewsStats from "./components/LatestReviewsStats";
import OrderStatusCount from "./components/OrderStatusCount";
import RevenueChart from "./components/RevenueChart";
import TopColor from "./components/TopColor";
import TopSize from "./components/TopSize";

const Dashboard: React.FC = () => {
  return (
    <>
      <Heading title="Bảng điều khiển" hasBreadcrumb />
      <OrderStatusCount />
      <RevenueChart />
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <TopSize />
        <TopColor />
      </div>
      <div className="grid gap-8">
        <AlmostOutStockProduct />
        <LatestReviewsStats />
      </div>
    </>
  );
};

export default Dashboard;
