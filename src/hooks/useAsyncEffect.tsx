import { useEffect, useState } from "react";

const useAsyncEffect = (callback: (async: Function) => unknown, dependencies: unknown[] = []) => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [responseData, setResponseData] = useState<Record<string, unknown>>({});

  const async = async (promise: Promise<unknown>, key: string): Promise<unknown> => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    return promise
      .then((res) => {
        setResponseData((prev) => ({ ...prev, [key]: res }));
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, [key]: false }));
      });
  };

  useEffect(() => {
    callback(async);
  }, dependencies);

  return { loading, response: responseData };
};

export default useAsyncEffect;
