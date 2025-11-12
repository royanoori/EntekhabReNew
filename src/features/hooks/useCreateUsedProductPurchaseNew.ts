import { useMutation } from "@tanstack/react-query";
import { createUsedProductPurchaseNew } from "../api/api";
import { TProductRequestList } from "../type/type";

export const useCreateUsedProductPurchaseNew = (options?: {
  onSuccess?: (data: string) => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation<string, Error, TProductRequestList>({
    mutationFn: (payload) => {
      if (!payload || payload.length === 0) {
        throw new Error("محصولی برای ثبت انتخاب نکرده اید");
      }

      return createUsedProductPurchaseNew(payload);
    },
    ...options,
  });
};
