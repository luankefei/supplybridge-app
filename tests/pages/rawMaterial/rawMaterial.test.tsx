import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import RawMaterial from "pages/raw-material";
import "@testing-library/jest-dom/extend-expect";

// This has to be mocked before running the test
jest.mock("next/router", () => require("next-router-mock"));

describe("RawMaterial", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<RawMaterial />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders correctly", () => {
    render(<RawMaterial />);
    // Finds autocomplete
    const autoCompleteInbox = screen.getByLabelText(
      "Type to find raw-material"
    );
    expect(autoCompleteInbox).toBeInTheDocument();
    // Finds the reset button
    const resetButton = screen.getByText("Reset All");
    expect(resetButton).toBeInTheDocument();
    // initially there is no chart
    const chart = screen.queryByTestId("raw-mateiral-chart");
    expect(chart).toBeNull();
  });

  it("selecting an element adds a chart", () => {
    render(<RawMaterial />);
    // the collapse is always there
    const rawMaterialCollapse = screen.getByTestId("raw-material-collapse");
    expect(rawMaterialCollapse).toBeInTheDocument();
    // but it's not visible at first
    expect(rawMaterialCollapse).not.toBeVisible();

    const toggleButtons = screen.getAllByTestId("vertical-button");
    expect(toggleButtons.length).toBe(7);
    // tap on one of the buttons
    fireEvent.click(toggleButtons[0]);
    // now it's visible
    expect(rawMaterialCollapse).toBeVisible();
    // so now we find toggle buttons
    const toggleButtonsInCollapse = screen.getAllByTestId(
      "raw-material-toggle-button"
    );
    expect(toggleButtonsInCollapse.length).toBe(6);
    // tab on one of the buttons
    fireEvent.click(toggleButtonsInCollapse[0]);
    // now we should see the chart!
    const chart = screen.getByTestId("raw-mateiral-chart");
    expect(chart).toBeInTheDocument();
  });
});
