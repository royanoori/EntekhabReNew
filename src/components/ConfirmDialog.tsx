"use client";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactNode } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmColor?: "primary" | "error" | "success" | "warning";
}

export default function ConfirmDialog({
  open,
  title = "تأیید عملیات",
  message,
  children,
  confirmText = "بله",
  cancelText = "خیر",
  onConfirm,
  onClose,
  confirmColor = "primary",
}: ConfirmDialogProps) {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          minWidth: 400,
          p: 1,
        },
      }}
    >
      {title && (
        <DialogTitle
          sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center" }}
        >
          {title}
        </DialogTitle>
      )}

      <DialogContent>
        {message && (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", mb: children ? 2 : 0 }}
          >
            {message}
          </Typography>
        )}
        {children}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", gap: 1, pb: 2 }}>
        <Button variant="contained" color="error" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="contained" color={confirmColor} onClick={onConfirm}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
