import React from "react";
import Heading from "@/components/layout/Heading";
import TopColor from "./components/TopColor";

const Dashboard: React.FC = () => {
  return (
    <>
      {" "}
      <Heading title="Bảng điều khiển" hasBreadcrumb />
      <TopColor />
    </>
  );
};

export default Dashboard;
