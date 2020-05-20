import React from "react";
import Listings from "./listings";
import { render, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getAreaListings } from "../apiCalls";
import { listingDataOne, listingDataTwo } from "../testing-data";
import { BrowserRouter } from "react-router-dom";
jest.mock("../apiCalls.js");
getAreaListings.mockResolvedValue([listingDataOne, listingDataTwo]);

describe("Listings", () => {
  it("should be able to render a component to the page", () => {
    const { getByTestId } = render(<Listings />);
    expect(getByTestId("listings")).toBeInTheDocument();
  });
  it("should fetch data from a source and list it", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <Listings area={590} favorites={[]} />
      </BrowserRouter>
    );
    await wait(() => {
      expect(getByText("Lowkey Industrial Chic")).toBeInTheDocument();
      expect(getByText("New Modern Flat in RiNo")).toBeInTheDocument();
    });
  });
});
