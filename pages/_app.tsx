import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider } from "styled-components";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";

import { theme } from "config/theme";
import NavigateService from "services/navigate";

import "../styles/css_short_loading_animation.css";
import "../styles/css_long_loading_animation.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const { push } = useRouter();
  NavigateService.initNavigate(push);

  return (
    <ThemeProvider theme={theme}>
      <NextNProgress color={"#08979C"} />
      <ToastContainer />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
