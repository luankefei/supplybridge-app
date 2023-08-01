import React from "react";
import { render, screen } from "@testing-library/react";
import RawMaterial from "pages/raw-material";

// This has to be mocked before running the test
jest.mock("next/router", () => require("next-router-mock"));

describe("RawMaterial", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<RawMaterial />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders correctly", () => {
    render(<RawMaterial />);
    const autoCompleteInbox = screen.getByLabelText(
      "Type to find raw-material"
    );
    expect(autoCompleteInbox).toBeInTheDocument();
  });
});
