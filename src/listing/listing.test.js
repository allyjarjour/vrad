import React from "react";
import Listing from "./listing";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";


describe("Listing", () => {
  it("should be able to render a component to the page", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Listing
          name="Super cool house"
          id={3}
          url={"/api/v1/listings/83331"}
        />
      </MemoryRouter>
    );
    expect(getByText("Super cool house")).toBeInTheDocument();
  });
});

