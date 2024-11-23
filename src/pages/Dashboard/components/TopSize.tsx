import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IResponseStat } from "@/services/store/stats/stat.model";
import { IStatsInitialState } from "@/services/store/stats/stats.slice";
import { getMostPurchasedSize } from "@/services/store/stats/stats.thunk";
import { Pie } from "@ant-design/plots";
import { useEffect } from "react";

const TopSize = () => {
  const { state, dispatch } = useArchive<IStatsInitialState>("stats");

  useAsyncEffect(
    (async) => async(dispatch(getMostPurchasedSize({ query: { _pagination: false, ...state.filter } })), "getMostPurchasedColor"),
    [JSON.stringify(state.filter)],
  );
  const data = state.sizes.map((s: IResponseStat) => ({
    type: "Cỡ " + s.name,
    value: s.total,
  }));

  useEffect(() => {
    const a = document.getElementsByClassName("g2-html-annotation");
    if (a.length > 0) {
      const e = a[0] as HTMLElement;
      e.innerHTML = "Tổng";
      e.style.paddingBlockEnd = "0.25rem";
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
    <div className="flex max-w-[400px] flex-col gap-2">
      <p className="font-black">Cỡ được mua nhiều nhất</p>
      <p className=""> Trong 7 ngày vừa qua </p>
      <Pie {...config} />
    </div>
  );
};

export default TopSize;
