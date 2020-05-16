import React from "react";
import Listing from "./listing";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Listing", () => {
  it("should be able to render a component to the page", () => {
    const { getByText } = render(<Listing name="Super cool house" id={3} />);
    expect(getByText("Super cool house")).toBeInTheDocument();
  });
});
