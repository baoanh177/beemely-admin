import { useDispatch, useSelector } from "react-redux";

import { RootStateType } from "@/services/reducers";
import { AppDispatch } from "@/services/store";
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
