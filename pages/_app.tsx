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

  return (
    <SafeHydrate>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={muiTheme}>
          {/* This div is required,
          I am not 100% sure why, but without this some pages
          might get client side error when user hits page refresh (F5 / cmd+R)
          */}
          <div>
            <NextNProgress color={"#08979C"} />
            <ToastContainer />
            <Component {...pageProps} />
          </div>
        </MuiThemeProvider>
      </ThemeProvider>
    </SafeHydrate>
  );
}
