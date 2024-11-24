import React from "react";
import Heading from "@/components/layout/Heading";
import TopSize from "./components/TopSize";
import TopColor from "./components/TopColor";
import AlmostOutStockProduct from "./components/AlmostOutStockProduct";
import LatestReviewsStats from "./components/LatestReviewsStats";
import RevenueChart from "./components/RevenueChart";

const Dashboard: React.FC = () => {
  return (
    <>
      {" "}
      <Heading title="Bảng điều khiển" hasBreadcrumb />
      <RevenueChart />
      <AlmostOutStockProduct />
      <TopSize />
      <TopColor />
      <LatestReviewsStats />
    </>
  );
};

export default Dashboard;
