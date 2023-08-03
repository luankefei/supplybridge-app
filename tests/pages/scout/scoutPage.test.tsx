import React from "react";
import { render, screen } from "@testing-library/react";
import Scout from "pages/scout";
import { renderWithTheme } from "../../test-utils";

// This has to be mocked before running the test
jest.mock("next/router", () => require("next-router-mock"));
// mock the map
/**
 * Unfortunately, Jest cannot natively handle these kinds of tests as it does not have * full DOM or SVG support.
 */
jest.mock("react-simple-maps", () => ({
  ComposableMap: (props: any) => <div>ComposableMap</div>,
  ZoomableGroup: (props: any) => <div>ZoomableGroup</div>,
  Geographies: (props: any) => <div>Geographies</div>,
  Geography: (props: any) => <div>Geography</div>,
  Marker: (props: any) => <div>Marker</div>,
}));

describe("Scout", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderWithTheme(<Scout />);
    expect(asFragment()).toMatchSnapshot();
  });
});
