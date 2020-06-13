import React from "react";
import NoListingAlert from "./no-listing-alert";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe('NoListingAlert', () => {
  it('should display an alert when no listings have been selected', () => {
   const { getByText } = render(<NoListingAlert alertType={"reg-listing-alert"}/>)
   expect(getByText("Click on a listing to read more")).toBeInTheDocument();
  })
  it('should display an alert when the user has no favorites to display', () => {
   const { getByText } = render(<NoListingAlert alertType={"favorites-alert"}/>)
   expect(getByText("You have nothing favorited yet!")).toBeInTheDocument();
  })
})
