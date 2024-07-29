import { useEffect, useState } from "react";

type TAsyncFunction = (promise: Promise<unknown>, key: string) => Promise<unknown>;

const useAsyncEffect = (callback: (async: TAsyncFunction) => unknown, dependencies: unknown[] = []) => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const async: TAsyncFunction = async (promise, key) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    return promise.finally(() => {
      setLoading((prev) => ({ ...prev, [key]: false }));
    });
  };

  useEffect(() => {
    callback(async);
  }, dependencies);

  return loading;
};

export default useAsyncEffect;
