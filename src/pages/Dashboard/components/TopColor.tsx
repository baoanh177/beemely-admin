import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IResponseStat } from "@/services/store/stats/stat.model";
import { IStatsInitialState } from "@/services/store/stats/stats.slice";
import { getMostPurchasedColor } from "@/services/store/stats/stats.thunk";
import { Pie } from "@ant-design/plots";
import { Card } from "antd";
import { useEffect } from "react";

const TopColor = () => {
  const { state, dispatch } = useArchive<IStatsInitialState>("stats");

  useAsyncEffect(
    (async) => async(dispatch(getMostPurchasedColor({ query: { _pagination: false, ...state.filter } })), "getMostPurchasedColor"),
    [JSON.stringify(state.filter)],
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
  return (
    <Card className="flex max-w-full flex-col space-y-8">
      <p className="mb-6 text-lg font-medium md:text-2xl">Màu được mua nhiều nhất trong 7 ngày gần nhất</p>
      <Pie className="max-w-[400px] gap-6 md:max-w-full" {...config} />
    </Card>
  );
};

export default TopColor;
