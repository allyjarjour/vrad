import React from 'react'
import './no-listing-alert.css'
import PropTypes from "prop-types";


const NoListingAlert = ({alertType}) => {
    const regListing = (<div className="none-clicked">
        <p>Click on a listing to read more</p>
        </div>)
    const favorites = (<div className="none-clicked">
        <p>You have nothing favorited yet!</p>
    </div>)
    if (alertType === "reg-listing-alert") return regListing
    if (alertType === "favorites-alert") return favorites
    return null
}

NoListingAlert.propTypes = {
    alertType: PropTypes.string
}

export default NoListingAlert