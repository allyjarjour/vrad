import React from "react";
import FavoriteButton from "./favorite-button";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";


describe('FavoriteButton', () => {
    it('should display an unfavorited icon button if favorited property is false', () => {
        const toggleFavorited = jest.fn()
        const { getByTitle } = render(<FavoriteButton 
            toggleFavorited={toggleFavorited} 
            favorited={false} />)
            expect(getByTitle('Unfavorited icon')).toBeInTheDocument()
    })
    it('should display a favorited icon button if favorited property is true', () => {
        const { getByTitle } = render(<FavoriteButton 
            favorited={true} />)
            expect(getByTitle('Favorited icon')).toBeInTheDocument()
    })
    it('should trigger the toggleFavorited function when clicked', () => {
        const toggleFavorite = jest.fn()
        const { getByTitle } = render(<FavoriteButton 
            toggleFavorite={toggleFavorite} 
            favorited={false} />)
            fireEvent.click(getByTitle('Unfavorited icon'));
            expect(toggleFavorite).toHaveBeenCalled();
    })
})