import React from "react";
import App from "./app";
import { createMemoryHistory } from "history";
import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, Router } from "react-router-dom";
import {
  getAreaData,
  getAreaListings,
  getAreas,
  getFaveListings,
  getListingData,
} from "../apiCalls";
import { areasData, areaData, listingDataOne } from "../testing-data";
jest.mock("../apiCalls.js");
getAreas.mockResolvedValue(areasData);
getAreaData.mockResolvedValue(areaData);
getAreaListings.mockResolvedValue([listingDataOne]);
getListingData.mockResolvedValue(listingDataOne);

describe("App", () => {
  it("should render without crashing", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  it("should load the login page upon startup", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(getByTestId("login-page")).toBeInTheDocument();
  });

  it("should redirect to the area view page when logged in", () => {
    const app = (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const {
      getByPlaceholderText,
      getByDisplayValue,
      getByText,
      getByTestId,
    } = render(app);

    const name = getByPlaceholderText("Name");
    const email = getByPlaceholderText("Email");
    const purpose = getByDisplayValue("Choose one");
    const submit = getByText("Sign In");

    fireEvent.change(name, { target: { value: "Bat man" } });
    fireEvent.change(email, { target: { value: "notbruce@wayne.com" } });
    fireEvent.change(purpose, { target: { value: "business" } });
    fireEvent.click(submit);

    expect(name).not.toBeInTheDocument();
    expect(getByText("Welcome, Bat! Stay productive!")).toBeInTheDocument(); // navbar
    expect(getByTestId("area-view")).toBeInTheDocument(); // area view
  });

  it("should load the area listing page", async () => {
    const history = createMemoryHistory();
    history.push("/areas/");
    const app = (
      <Router history={history}>
        <App />
      </Router>
    );

    const { getByText, getAllByText } = render(app);
    await wait();
    const button = getAllByText(/View ([0-9]+) listings/)[0];
    fireEvent.click(button);
    expect(button).not.toBeInTheDocument();
    await wait();
    expect(getByText("Lowkey Industrial Chic")).toBeInTheDocument();
  });
  it("should display listing details when clicked", async () => {
    const history = createMemoryHistory();
    history.push("/areas/590/listings/");
    const app = (
      <Router history={history}>
        <App />
      </Router>
    );

    const { getByText } = render(app);
    await wait();
    fireEvent.click(getByText(/Chic/));
    await wait();
    expect(getByText("2441 Broadway Ave", { exact: false }));
    expect(getByText("$220/night")).toBeInTheDocument();
  });
});
