import React from "react";
import ExpandedListing from "./expanded-listing";
import { render, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe('ExpandedListing', () => {
    it('should display a title of the listing name', async () => {
        const { getByText } = render(<ExpandedListing listingID={'310'} />)
        await wait(() => {
            expect(getByText("Brand New RiNo Build")).toBeInTheDocument()
        })
    })
})