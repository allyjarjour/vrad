import React from 'react'
import './listing-details.css'
import PropTypes from 'prop-types'

const ListingDetails = ({cost, beds, baths, features, address}) => {
    return (
        <div className="listing-details">
            <div className="features" >
                <h2>Listing details:</h2>
                <p>${cost}/night</p>
                <p>{beds} beds</p>
                <p>{baths} baths</p>
                {features && features.map((feature , i)=> <p key={i}>{feature}</p>)}
            </div>
            <div className="address">
                <h2>Address</h2>
                <p>{address}, Denver, CO</p>
            </div>
        </div>
    )
}

ListingDetails.propTypes = {
    cost: PropTypes.number,
    beds: PropTypes.number,
    baths: PropTypes.number,
    features: PropTypes.array,
    address: PropTypes.string
}

export default ListingDetails