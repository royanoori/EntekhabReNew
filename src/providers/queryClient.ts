import { QueryClient } from "@tanstack/react-query";
import { globalShowSnackbar } from "./SnackbarProvider";
import axios from "axios";

type QueryCacheEventWithError = {
  error?: unknown;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

// هندل گلوبال خطا
queryClient.getQueryCache().subscribe((event: unknown) => {
  // بررسی اینکه event دارای پروپرتی error است
  const evt = event as QueryCacheEventWithError;
  if (evt.error) {
    const error = evt.error;
    let errorMessage = "خطای ناشناخته";

    if (axios.isAxiosError(error)) {
      if (error.response?.data && typeof error.response.data === "object") {
        const data = error.response.data as Record<string, unknown>;
        if (typeof data.Message === "string" && data.Message.trim() !== "") {
          errorMessage = data.Message;
        } else {
          errorMessage = error.message;
        }
      } else {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    if (globalShowSnackbar) {
      globalShowSnackbar(errorMessage, "error");
    }
  }
});
