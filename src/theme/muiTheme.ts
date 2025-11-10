import { createTheme } from "@mui/material/styles";
import { themes } from "./themeConfig";
import { faIR } from "@mui/material/locale";

export const createMuiTheme = (mode: "light" | "dark", fontSize: number) => {
  const selectedTheme = themes[mode];

  return createTheme(
    {
      palette: {
        mode,
        primary: { main: selectedTheme.colors.primary },
        secondary: { main: selectedTheme.colors.secondary },
        background: {
          default: selectedTheme.colors.background,
          paper: selectedTheme.colors.paper,
        },
        text: { primary: selectedTheme.colors.text },
      },
      typography: {
        fontFamily: themes.font.family,
        fontSize,
      },
      components: {
        MuiOutlinedInput: {
          styleOverrides: {
            input: {
              color: mode === "dark" ? "#fff" : "#000",
            },
            notchedOutline: {
              borderColor: "#ccc",
              borderRadius: "10px",
            },
            root: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px", // حالت عادی
                borderColor: mode === "dark" && "#525252",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px", // در حالت فوکوس هم نازک بمونه
              },
              "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px", // 👈 حالت خطا نازک بمونه
                borderColor: "#d32f2f", // رنگ خطای MUI پیش‌فرض (می‌تونی عوضش کنی)
              },
            },
          },
        },
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: mode === "dark" ? "#939393" : "#939393",
            },
          },
        },
        MuiFormHelperText: {
          styleOverrides: {
            root: {
              color: mode === "dark" ? "#aaa" : "#666",
            },
          },
        },
      },
      direction: "rtl",
    },
    faIR
  );
};
