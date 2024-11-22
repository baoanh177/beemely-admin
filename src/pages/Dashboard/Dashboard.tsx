import React from "react";
import Heading from "@/components/layout/Heading";
import TopSize from "./components/TopSize";
import TopColor from "./components/TopColor";

const Dashboard: React.FC = () => {
  return (
    <>
      {" "}
      <Heading title="Bảng điều khiển" hasBreadcrumb />
      <TopSize />
      <TopColor />
    </>
  );
};

export default Dashboard;
