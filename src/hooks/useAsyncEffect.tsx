import { useEffect, useState } from "react";

const useAsyncEffect = (callback: (async: Function) => unknown, dependencies: unknown[] = []) => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const async = async (promise: Promise<unknown>, key: string): Promise<unknown> => {
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
