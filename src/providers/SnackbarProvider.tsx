"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  Snackbar,
  Alert,
  IconButton,
  Slide,
  SlideProps,
  SnackbarCloseReason,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type SnackbarMessage = {
  id: number;
  message: string;
  severity: "error" | "success" | "info" | "warning";
  open: boolean;
};

type SnackbarContextType = {
  showMessage: (
    message: string,
    severity?: "error" | "success" | "info" | "warning"
  ) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx)
    throw new Error("useSnackbar باید داخل SnackbarProvider استفاده شود");
  return ctx;
};

export let globalShowSnackbar: SnackbarContextType["showMessage"] | null = null;

const TransitionUp = (props: SlideProps) => (
  <Slide {...props} direction="down" />
);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<SnackbarMessage[]>([]);

  const showMessage = (
    message: string,
    severity: "error" | "success" | "info" | "warning" = "info"
  ) => {
    const id = new Date().getTime() + Math.random();
    setMessages((prev) => [...prev, { id, message, severity, open: true }]);
  };

  useEffect(() => {
    globalShowSnackbar = showMessage;
  }, []);

  const handleClose =
    (id: number) =>
    (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") return;
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, open: false } : msg))
      );
    };

  const handleExited = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}

      {/* Stack of Snackbars */}
      {messages.map((msg, index) => (
        <Snackbar
          key={msg.id}
          open={msg.open}
          autoHideDuration={5000} // زمان نمایش کوتاه تر برای UX بهتر
          onClose={handleClose(msg.id)}
          TransitionComponent={TransitionUp}
          TransitionProps={{ onExited: () => handleExited(msg.id) }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{
            mt: `${index * 70}px`, // فاصله بین پیام ها
            maxWidth: { xs: "90%", sm: "400px" }, // موبایل و دسکتاپ
            width: "fit-content",
            direction: "rtl",
            "&.MuiSnackbar-root": {
              justifyContent: "flex-start",
            },
          }}
        >
          <Alert
            severity={msg.severity}
            variant="filled"
            sx={{
              fontFamily: "Vazirmatn, Arial, sans-serif",
              fontSize: "0.875rem",
              textAlign: "right",
              direction: "rtl",
              wordBreak: "break-word",
            }}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose(msg.id)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {msg.message}
          </Alert>
        </Snackbar>
      ))}
    </SnackbarContext.Provider>
  );
};
