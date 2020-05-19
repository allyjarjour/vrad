import React from "react";
import ListingDetails from "./listing-details";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";

describe('ListingDetails', () => {
    it('should display listing details', () => {
        const { getByText } = render(<ListingDetails 
            cost={450} beds={6} baths={3.5} features={['hot tub', 'kegorator', 'chocolate fountain']} 
            />)
        expect(getByText('Listing details:')).toBeInTheDocument() 
        expect(getByText('$450/night')).toBeInTheDocument() 
        expect(getByText('6 beds')).toBeInTheDocument() 
        expect(getByText('3.5 baths')).toBeInTheDocument() 
        expect(getByText('hot tub')).toBeInTheDocument() 
        expect(getByText('kegorator')).toBeInTheDocument() 
        expect(getByText('chocolate fountain')).toBeInTheDocument() 
    })
    it('should display listing address', () => {
        const { getByText } = render(<ListingDetails 
            address={'123 Rainbow Blvd'}
            />)
        expect(getByText('123 Rainbow Blvd, Denver, CO')).toBeInTheDocument() 
    })
})