const useStorage = () => {
  const setStorage = (key: string, data: unknown) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  const getStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) as string) ?? null;
  };
  return { setStorage, getStorage };
};

export default useStorage;
