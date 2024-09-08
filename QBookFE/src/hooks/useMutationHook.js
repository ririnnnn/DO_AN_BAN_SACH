import { useMutation } from "@tanstack/react-query";

const useMutationHook = (fnCallBack) => {
  return useMutation({
    mutationFn: fnCallBack,
  });
};

export default useMutationHook;
