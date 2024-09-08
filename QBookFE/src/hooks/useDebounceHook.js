import { useEffect, useState } from "react";

export const useDebounceHook = (value, milliSeconds) => {
  const [dataDebounce, setDataDebounce] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDataDebounce(value);
    }, [milliSeconds]);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  return dataDebounce;
};
