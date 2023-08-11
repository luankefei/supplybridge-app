import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";

import { theme } from "config/theme";
import { muiTheme } from "config/muiTheme";
import NavigateService from "services/navigate";

import "../styles/css_short_loading_animation.css";
import "../styles/css_long_loading_animation.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import "../utils/i18n";
import { VERSION } from "config";

interface SafeHydrateProps {
  children: React.ReactNode;
}

function SafeHydrate({ children }: SafeHydrateProps) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}
export default function App({ Component, pageProps }: AppProps) {
  const { push } = useRouter();
  NavigateService.initNavigate(push);
  console.debug("App version:", VERSION);

  return (
    <SafeHydrate>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={muiTheme}>
          <NextNProgress color={"#08979C"} />
          <ToastContainer />
          <Component {...pageProps} />
        </MuiThemeProvider>
      </ThemeProvider>
    </SafeHydrate>
  );
}
