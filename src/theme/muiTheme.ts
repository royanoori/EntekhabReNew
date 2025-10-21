import { createTheme } from "@mui/material/styles";
import { themes } from "./themeConfig";

export const createMuiTheme = (mode: "light" | "dark", fontSize: number) => {
  const selectedTheme = themes[mode];

  return createTheme({
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
    direction: "rtl", // اگر RTL لازمه
  });
};
