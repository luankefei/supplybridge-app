import { createTheme } from "@mui/material";

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
    },
    secondary: {
      main: "#F2F2F2",
    },
    grey: {
      100: "#F2F2F2",
      200: "#E0E0E0",
      300: "#BDBDBD",
      400: "#828282",
      500: "#4F4F4F",
      600: "#333333",
    },
  },
});
