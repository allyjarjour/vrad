import React from "react";
import AreaView from "./area-view";
import { render, wait, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { getAreas, getAreaData } from "../apiCalls";
import { areasData, areaData } from "../testing-data"
jest.mock("../apiCalls.js");


describe("AreaView", () => {
  it("should be able to render a component to the page", async () => {
    getAreas.mockResolvedValueOnce(areasData);
    getAreaData.mockResolvedValueOnce(areaData);
    const { getByTestId } = render(
      <MemoryRouter>
        <AreaView />
      </MemoryRouter>
    );
    await wait(() => 
      expect(getByTestId("area-view")).toBeInTheDocument()
    );
  });
  it("should list all available areas", async () => {
    getAreas.mockResolvedValueOnce(areasData);
    getAreaData.mockResolvedValueOnce(areaData);
    const { getByText } = render(
      <MemoryRouter>
        <AreaView />
      </MemoryRouter>
    );
    await wait(
      () =>
        expect(getByText("RiNo")).toBeInTheDocument() &&
        expect(getByText("Park Hill")).toBeInTheDocument() &&
        expect(getByText("LoHi")).toBeInTheDocument() &&
        expect(getByText("Cap Hill")).toBeInTheDocument()
    );
  });
  it.skip("should redirect the user to the correct area when clicked", async () => {
    const { getByText, rerender } = render(
      <MemoryRouter>
        <AreaView />
      </MemoryRouter>
    );
    await wait(() => {
      const card = getByText("RiNo").parentElement;
      const button = card.querySelector("a");
      fireEvent.click(button);
      rerender();
      expect(card).not.toBeInTheDocument();
    });
  });
});
