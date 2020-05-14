import React from 'react';
import SignIn from './sign-in';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('SignIn page', () => {
    it('should have a title', () => {
        const { getByText } = render(<SignIn />)
        expect(getByText('vrad')).toBeInTheDocument()
    })
    describe('SignIn form', () => {
        it(`Should display placeholder text for name, email and purpose selection 
            if there is nothing typed or selected`, () => {
            const { getByPlaceholderText, getByText } = render(<SignIn />)
            expect(getByPlaceholderText('Name')).toBeInTheDocument()
            expect(getByPlaceholderText('Email')).toBeInTheDocument()
            expect(getByText('Choose one')).toBeInTheDocument()
        })
        it('Should update name, email and purpose property values on change', () => {
            const { getByPlaceholderText, getByText } = render(<SignIn />)
            fireEvent.change(getByPlaceholderText('Name'), {target: {value: 'Sam'}})
            fireEvent.change(getByPlaceholderText('Email'), {target: {value: 'samiscool@aol.com'}})
            fireEvent.change(getByText('Choose one'), {target: {value: 'Business'}})
            expect(getByPlaceholderText('Name').value).toBe('Sam')
            expect(getByPlaceholderText('Email').value).toBe('samiscool@aol.com')
            expect(getByText('Choose one').value).toBe('Business')
        })
        ///check sad path, it won't trigger fn and outline will appear
        // it('When the Sign in button is clicked, it should trigger the signIn method', async () => {
        //     const updateLogin = jest.fn()
        //     const { getByText, rerender } = render(<SignIn updateLogin={updateLogin}/>)
        //     fireEvent.click(getByText('Sign In'))
        //     rerender(<SignIn updateLogin={updateLogin}/>)
        //     expect(updateLogin).toHaveBeenCalled()
        //     //need to add aysnc // await _____________________
        // })
    })
})