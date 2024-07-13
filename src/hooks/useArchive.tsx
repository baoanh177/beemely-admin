import { useDispatch, useSelector } from "react-redux";

import { RootStateType } from "@/services/reducers";
import { AppDispatch } from "@/services/store";
const useArchive = <T,>(key?: keyof RootStateType) => {
  const dispatch = useDispatch<AppDispatch>();

  const selector: typeof useSelector = useSelector;
  let state: T = {} as T;
  if (key) {
    //@ts-ignore
    state = useSelector((state: RootStateType) => state[key]);
    return { dispatch, selector, state };
  }
  return { dispatch, selector, state };
};

export { useArchive };
