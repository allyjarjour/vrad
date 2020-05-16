import React from "react";
import Listings from "./listings";
import { render, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Listings", () => {
  it("should be able to render a component to the page", () => {
    const { getByTestId } = render(<Listings />);
    expect(getByTestId("listings")).toBeInTheDocument();
  });
  it("should fetch data from a source and list it", async () => {
    const { getByText } = render(<Listings area={590} />);
    await wait(() => {
      expect(getByText("Hip RiNo Party Spot")).toBeInTheDocument();
      expect(getByText("Lowkey Industrial Chic")).toBeInTheDocument();
    });
  });
});
