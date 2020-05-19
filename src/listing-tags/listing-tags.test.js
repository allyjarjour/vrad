import React from "react";
import ListingTags from "./listing-tags";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe('ListingTags', () => {
    it('should display an area tag for a listing', () => {
        const { getByText } = render(<ListingTags area={'rino'} />)
        expect(getByText('rino')).toBeInTheDocument();
    })
    it('should display a superhost tag if superhost property is true', () => {
        const { getByText } = render(<ListingTags superhost={true} />)
        expect(getByText('superhost')).toBeInTheDocument();
    })
    it('should not display a superhost tag if superhost property is false', () => {
        const { queryByText } = render(<ListingTags superhost={false} />)
        expect(queryByText('superhost')).not.toBeInTheDocument();
    })
})