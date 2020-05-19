import React from "react";
import ListingPhotos from '../listing-photos/listing-photos'
import { render, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe('ListingPhotos', () => {
    it('should display three photos of the listing', async () => {
        const { getAllByAltText } = render(<ListingPhotos listing_id={310} name={"Brand New RiNo Build"} />)
        await wait(() => {
            expect(getAllByAltText("Brand New RiNo Build")).toHaveLength(3)
        }) 
        
    })
})