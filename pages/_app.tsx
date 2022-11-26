import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import NextNProgress from "nextjs-progressbar";

import { theme } from "config/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <NextNProgress color={"#08979C"} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
