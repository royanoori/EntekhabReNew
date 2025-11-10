"use client";

import { ReactNode, useEffect, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, RootState, AppDispatch } from "../store/store";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { setMode } from "../store/slices/themeSlice";
import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "./SnackbarProvider";
import { queryClient } from "./queryClient";
import { CacheProvider } from "@emotion/react";
import createRtlCache from "@/theme/rtl-cache";
import Loading from "@/app/loading";
import { createMuiTheme } from "@/theme/muiTheme";
// // ایجاد یک QueryClient برای React Query
// const queryClient = new QueryClient();
interface ProvidersProps {
  children: ReactNode;
}

function ThemeWrapper({ children }: { children: ReactNode }) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch: AppDispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // فقط روی کلاینت اجرا میشه
    const savedMode =
      (localStorage.getItem("themeMode") as "light" | "dark") || "light";
    dispatch(setMode(savedMode));
    setMounted(true);
  }, [dispatch]);

  useEffect(() => {
    if (mode === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [mode]);

  if (!mounted) {
    return <Loading />; // هیچ UI نده تا کلاینت آماده بشه
  }

  const theme = createMuiTheme(mode, 14);
  theme.direction = "rtl";
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div dir="rtl">{children}</div>
    </MuiThemeProvider>
  );
}

export default function AppProviders({ children }: ProvidersProps) {
  const cacheRtl = createRtlCache();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <CacheProvider value={cacheRtl}>
            <ThemeWrapper>{children}</ThemeWrapper>
          </CacheProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </Provider>
  );
}
