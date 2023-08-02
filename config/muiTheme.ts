import { createTheme } from "@mui/material";

/**
 * @description MUI theme
 * @usage
 * ```tsx
 * import { useTheme } from "@mui/material/styles";
 * ...
 * const theme = useTheme();
 * ...
 * <Button color={theme.palette.primary.main} />
 * ```
 */
export const muiTheme = createTheme({
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#08979C",
      // light:
      // dark:
      contrastText: "#E6F5F5",
    },
    secondary: {
      main: "#E6F5F5",
      // light:
      // dark:
      contrastText: "#08979C",
    },
    text: {
      primary: "#434343",
      secondary: "#9ca3af",
      disabled: "#F0F0F0",
    },
    grey: {
      100: "#F2F2F2",
      200: "#E0E0E0",
      300: "#BDBDBD",
      400: "#828282",
      500: "#4F4F4F",
      600: "#333333",
    },
    background: {
      default: "#fff",
      paper: "#F9FAFB",
    },
  },
});
