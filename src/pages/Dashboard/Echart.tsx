import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

const RevenueChart = () => {
  const [chartType, setChartType] = useState("day");

  const dailyData = [
    { date: "2023-01-01", revenue: 100 },
    { date: "2023-01-02", revenue: 200 },
    // ... more daily data
  ];

  const weeklyData = [
    { week: "2023-W01", revenue: 1500 },
    { week: "2023-W02", revenue: 1800 },
    // ... more weekly data
  ];

  const monthlyData = [
    { month: "2023-01", revenue: 6000 },
    { month: "2023-02", revenue: 7500 },
    // ... more monthly data
  ];

  const data: any = {
    day: dailyData,
    week: weeklyData,
    month: monthlyData,
  };

  const getOption = (data: any, type: any) => {
    return {
      title: {
        text: `Revenue by ${type}`,
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: data.map((item: any) => item[type]),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Revenue",
          type: "line",
          data: data.map((item: any) => item.revenue),
        },
      ],
    };
  };

  return (
    <div>
      <button onClick={() => setChartType("day")}>Daily</button>
      <button onClick={() => setChartType("week")}>Weekly</button>
      <button onClick={() => setChartType("month")}>Monthly</button>
      <ReactECharts option={getOption(data[chartType], chartType)} style={{ height: 400, width: "100%" }} />
    </div>
  );
};

export default RevenueChart;
