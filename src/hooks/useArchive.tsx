import { useDispatch, useSelector } from "react-redux";

import { RootStateType } from "@/stores/reducers";
import { AppDispatch } from "@/stores/stores";
const useArchive = <T,>(key?: keyof RootStateType) => {
  const dispatch = useDispatch<AppDispatch>();

  const selector: typeof useSelector = useSelector;
  if (key) {
    //@ts-ignore
    const state: T = useSelector((state: RootStateType) => state[key]);
    return { dispatch, selector, state };
  }
  return { dispatch, selector };
};

export { useArchive };
