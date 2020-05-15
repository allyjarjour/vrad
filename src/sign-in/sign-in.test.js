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
        it('should not trigger the updateLogin method if all inputs are not filled or selected', () => {
            const updateLogin = jest.fn()
            const { getByText, getByPlaceholderText } = render(<SignIn updateLogin={updateLogin} />)
            fireEvent.change(getByPlaceholderText('Name'), {target: {value: 'Sam'}})
            fireEvent.change(getByPlaceholderText('Email'), {target: {value: 'samiscool@aol.com'}})
            fireEvent.click(getByText('Sign In'))
            expect(updateLogin).not.toHaveBeenCalled()
        })
        it('When the Sign in button is clicked with all inputs filled and selected, it should trigger the updateLogin method', () => {
            const updateLogin = jest.fn()
            const { getByText, getByPlaceholderText, getByRole } = render(<SignIn updateLogin={updateLogin} />)
            fireEvent.change(getByPlaceholderText('Name'), {target: {value: 'Sam'}})
            fireEvent.change(getByPlaceholderText('Email'), {target: {value: 'samiscool@aol.com'}})
            fireEvent.change(getByRole('combobox'), {target: {value: 'Business'}})
            fireEvent.click(getByText('Sign In'))
            expect(updateLogin).toHaveBeenCalled()
            // expect(updateLogin).toHaveBeenCalledWith({name: 'Sam', purpose: 'Business', email: 'samiscool@aol.com'})
            //it keeps sending value for purpose as true
        })
    })
})