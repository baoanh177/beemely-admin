import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IStatsInitialState } from "@/services/store/stats/stats.slice";
import { getAlmostOutStockProduct } from "@/services/store/stats/stats.thunk";
import React from "react";

const AlmostOutStockProduct = () => {
  const { state, dispatch } = useArchive<IStatsInitialState>("stats");

  useAsyncEffect(
    (async) => async(dispatch(getAlmostOutStockProduct({ query: { _pagination: false, ...state.filter } })), "getMostPurchasedColor"),
    [JSON.stringify(state.filter)],
  );
  return <div>AlmostOutStockProduct</div>;
};

export default AlmostOutStockProduct;
