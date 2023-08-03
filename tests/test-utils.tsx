// test-utils.js
import React from "react";
import { RenderOptions, render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { theme } from "config/theme";
import { muiTheme } from "config/muiTheme";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeProvider>
  );
};
/**
 * Renders a component with the theme provider
 *
 * @param ui -- the component to render
 * @param options -- options to pass to render
 *
 * USAGE:
 * const { asFragment } = renderWithTheme(<Scout />);
 */
const renderWithTheme = (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: RenderOptions<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  >
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithTheme };
