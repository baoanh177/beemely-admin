import React, { useState } from "react";
import { Column, Line } from "@ant-design/plots";
import { Card, Select } from "antd";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IStatsInitialState } from "@/services/store/stats/stats.slice";
import { useArchive } from "@/hooks/useArchive";
import { getTotalRevenue } from "@/services/store/stats/stats.thunk";

type TDateTypeQuery = "day" | "month" | "year";

const RevenueChart: React.FC = () => {
  const [dateType, setDateType] = useState<TDateTypeQuery>("day");
  const { state, dispatch } = useArchive<IStatsInitialState>("stats");

  const { loading } = useAsyncEffect(
    (async) => async(dispatch(getTotalRevenue({ query: { _pagination: false, ...state.filter, type: dateType } })), "getLatestReviews"),
    [JSON.stringify(state.filter), dateType],
  );

  const config = {
    data: state.totalRevenues,
    xField: "date",
    yField: "totalRevenue",
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      date: { alias: dateType === "day" ? `Ngày` : dateType === "month" ? "Tháng" : "Năm" },
      totalRevenue: { alias: "Tổng doanh thu" },
    },
  };

  const orderCountConfig = {
    data: state.totalRevenues,
    xField: "date",
    yField: "orderCount",
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      orderCount: { alias: "Số Đơn Hàng" },
    },
    lineStyle: {
      stroke: "#1890FF",
      lineWidth: 2,
    },
    point: {
      size: 5,
      shape: "diamond",
    },
    yAxis: {
      title: {
        text: "Số Đơn Hàng",
      },
    },
  };

  const handleChange = (value: TDateTypeQuery) => {
    setDateType(value);
  };

  return (
    <Card>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium md:text-2xl">
            Thống kê doanh thu theo {dateType === "day" ? `ngày` : dateType === "month" ? "tháng" : "năm"}
          </h3>
          <Select
            defaultValue="day"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "day", label: "Theo Ngày" },
              { value: "month", label: "Theo Tháng" },
              { value: "year", label: "Theo Năm" },
            ]}
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Column loading={loading} {...config} />
          <Line {...orderCountConfig} />
        </div>
      </div>
    </Card>
  );
};

export default RevenueChart;
