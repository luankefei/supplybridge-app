import React from "react";
import { render, screen } from "@testing-library/react";
import PoweredBy from "components/ui-components/poweredBy";
import {
  SpacingHorizontal,
  SpacingVertical,
} from "components/ui-components/spacer";
// This has to be mocked before running the test
// jest.mock("next/router", () => require("next-router-mock"));

describe("ui-Components", () => {
  it("poweredBy ok -- matches snapshot", () => {
    const { asFragment } = render(<PoweredBy />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("spacerV ok -- matches snapshot", () => {
    const { asFragment } = render(<SpacingVertical space={"10px"} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("spacerH ok -- matches snapshot", () => {
    const { asFragment } = render(<SpacingHorizontal space={"10px"} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
