import Heading from "@/components/layout/Heading";
import React from "react";
import AlmostOutStockProduct from "./components/AlmostOutStockProduct";
import LatestReviewsStats from "./components/LatestReviewsStats";
import TopBuyers from "./components/TopBuyers";
import OrderStatusCount from "./components/OrderStatusCount";
import RevenueChart from "./components/RevenueChart";
import TopColor from "./components/TopColor";
import TopSize from "./components/TopSize";

const Dashboard: React.FC = () => {
  return (
    <>
      <Heading title="Bảng điều khiển" hasBreadcrumb />
      <OrderStatusCount />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="flex flex-col gap-8">
          <TopSize />
          <TopColor />
        </div>
      </div>
      <AlmostOutStockProduct />
      <LatestReviewsStats />
      <TopBuyers />
    </>
  );
};

export default Dashboard;
