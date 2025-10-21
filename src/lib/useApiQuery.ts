import { useSnackbar } from "@/providers/SnackbarProvider";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

export const useApiQuery = <T>(
  key: string[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, AxiosError>, "queryKey" | "queryFn">
) => {
  const { showMessage } = useSnackbar();

  const result = useQuery<T, AxiosError>({
    queryKey: key,
    queryFn,
    staleTime: 60_000,
    retry: 0,
    refetchInterval: 60_000,
    ...options,
  });

  useEffect(() => {
    if (result.error) {
      const error = result.error;
      let msg = error.message || "خطای ناشناخته";

      if (error.response?.data && typeof error.response.data === "object") {
        const data = error.response.data as Record<string, unknown>;
        if (typeof data.Message === "string" && data.Message.trim() !== "") {
          msg = data.Message;
        }
      }

      showMessage(msg, "error");
    }
  }, [result.error, showMessage]);

  return result;
};
