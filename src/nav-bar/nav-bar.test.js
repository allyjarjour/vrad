import React from "react";
import NavBar from "./nav-bar";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";

describe("NavBar", () => {
  it("should be able to render a component to the page", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <NavBar name="Bat man" purpose="business" />
      </MemoryRouter>
    );
    expect(getByTestId("nav-bar")).toBeInTheDocument();
  });
  it("should have user's first name and a personalized message", () => {
    const { getByText } = render(
      <MemoryRouter>
        <NavBar name="Bat man" purpose="business" />
      </MemoryRouter>
    );
    expect(getByText("Welcome, Bat! Stay productive!")).toBeInTheDocument();
  });
  it("should show an options menu when the user icon is clicked", () => {
    const navBar = (
      <MemoryRouter>
        <NavBar name="Bat man" purpose="business" />
      </MemoryRouter>
    );
    const { getByText, getByTestId, rerender } = render(navBar);
    const menuButton = getByTestId("menu-button");
    fireEvent.click(menuButton);
    rerender(navBar);
    expect(getByText("Favorites")).toBeInTheDocument();
    expect(getByText("Sign Out")).toBeInTheDocument();
  });
  it("should correctly log the user out", () => {
    const logOut = jest.fn();
    const navBar = (
      <MemoryRouter>
        <NavBar name="Bat man" purpose="business" signOut={logOut} />
      </MemoryRouter>
    );
    const { getByText, getByTestId, rerender } = render(navBar);
    const menuButton = getByTestId("menu-button");
    fireEvent.click(menuButton);
    rerender(navBar);
    fireEvent.click(getByText("Sign Out"));
    expect(logOut).toHaveBeenCalled();
  });
});
