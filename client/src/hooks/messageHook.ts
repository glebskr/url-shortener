import { useCallback } from "react";

export const useMessage = () => {
  return useCallback((text: string) => {
    if ((<any>window).M! && text && text !== "") {
      (<any>window).M.toast({ html: text });
    }
  }, []);
};
