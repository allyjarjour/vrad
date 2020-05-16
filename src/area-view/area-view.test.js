import React from "react";
import AreaView from "./area-view";
import { render, wait, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";

describe("AreaView", () => {
  it("should be able to render a component to the page", () => {
    const { getByTestId } = render(<AreaView />);
    expect(getByTestId("area-view")).toBeInTheDocument();
  });
  it("should list all available areas", async () => {
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
  it("should redirect the user to the correct area when clicked", async () => {
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
