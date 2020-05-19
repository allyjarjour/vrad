import React from 'react'
import './listing-tags.css'
import PropTypes from 'prop-types'

const ListingTags = ({area, superhost}) => {
    return (
        <div className="tags" >
            <p className="area-tag">{area}</p>
            {superhost && <p className="host-tag">superhost</p>}
        </div>
    )
}

ListingTags.propTypes = {
    area: PropTypes.string,
    superhost: PropTypes.bool
}

export default ListingTags