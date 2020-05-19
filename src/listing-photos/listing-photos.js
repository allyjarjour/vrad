import React from 'react'
import './listing-photos.css'
import PropTypes from 'prop-types'

const ListingPhotos = ({listing_id, name}) => {
    return (
        <div className="photo-container">
            <img className="photo-one" src={`/images/${listing_id}_a.jpg`} alt={name} />
            <img className="photo-two" src={`/images/${listing_id}_b.jpg`} alt={name} />
            <img className="photo-three" src={`/images/${listing_id}_c.jpg`} alt={name} />
        </div>
    )
}

ListingPhotos.propTypes = {
    listing_id: PropTypes.number,
    name: PropTypes.string
}

export default ListingPhotos;
