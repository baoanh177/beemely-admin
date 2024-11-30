import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IResponseStat } from "@/services/store/stats/stat.model";
import { IStatsInitialState } from "@/services/store/stats/stats.slice";
import { getMostPurchasedColor } from "@/services/store/stats/stats.thunk";
import { Pie } from "@ant-design/plots";
import { Card, Select } from "antd";
import { useEffect, useState } from "react";

type TDateTypeQuery = "today" | "yesterday" | "this_week" | "last_week" | "this_month" | "last_month" | "this_year" | "last_year" | "all_time";
const TopColor = () => {
  const { state, dispatch } = useArchive<IStatsInitialState>("stats");
  const [dateType, setDateType] = useState<TDateTypeQuery>("this_week");

  useAsyncEffect(
    (async) =>
      async(dispatch(getMostPurchasedColor({ query: { _pagination: false, ...state.filter, period: dateType } })), "getMostPurchasedColor"),
    [JSON.stringify(state.filter), dateType],
  );

  const data = state.colors
    .map((s: IResponseStat) => ({
      type: s.name,
      value: s.total,
    }))
    .filter((e) => e.type !== undefined);

  useEffect(() => {
    const a = document.getElementsByClassName("g2-html-annotation");
    if (a.length > 0) {
      const e = a[0] as HTMLElement;
      const w = a[2] as HTMLElement;
      e.innerHTML = "Tổng";
      e.style.paddingBlockEnd = "0.25rem";
      w.innerHTML = "Tổng";
      w.style.paddingBlockEnd = "0.25rem";
    }
  }, [state]);
  const config: any = {
    data: data,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "AntV\nCharts",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 40,
          fontStyle: "bold",
        },
      },
    ],
  };
  const handleChange = (value: TDateTypeQuery) => {
    setDateType(value);
  };
  return (
    <Card className="flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-base font-medium md:text-2xl">Màu được mua nhiều nhất</p>
        <Select
          defaultValue="this_week"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: "today", label: "Hôm nay" },
            { value: "yesterday", label: "Hôm qua" },
            { value: "this_week", label: "Tuần này" },
            { value: "last_week", label: "Tuần trước" },
            { value: "this_month", label: "Tháng này" },
            { value: "last_month", label: "Tháng trước" },
            { value: "this_year", label: "Năm nay" },
            { value: "last_year", label: "Năm trước" },
            { value: "all_time", label: "Tất cả thời gian" },
          ]}
        />
      </div>
      <Pie {...config} />
    </Card>
  );
};

export default TopColor;
