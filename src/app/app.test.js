
import React from 'react';
import App from './App';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom";


describe('App', () => {
    it('should render without crashing', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        )
    })
})

