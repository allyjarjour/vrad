import React, { Component } from 'react';
import './expanded-listing.css';
import PropTypes from 'prop-types'
import ListingPhotos from '../listing-photos/listing-photos'
import ListingDetails from '../listing-details/listing-details'
import ListingTags from '../listing-tags/listing-tags'
import FavoriteButton from "../favorite-button/favorite-button";
import { getListingData } from '../apiCalls'




export default class ExpandedListing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if (this.props.listingID !== prevProps.listingID) {
      this.componentDidMount();
    }
  }

  componentDidMount = async () => {
    let data = await getListingData(this.props.listingID)
    if (data) {
      let { address, area, details, listing_id, name } = await data
      this.setState({
        name: name,
        address: address.street,
        area: area,
        beds: details.beds,
        baths: details.baths,
        cost: details.cost_per_night,
        features: details.features,
        listing_id: listing_id,
        superhost: details.superhost,
      })

    }
  }

  render() {
    if (!this.props.listingID) {
      return null
    } else {
      return (
        <section className="details-section">
          <div className="listing-title-container">
            <h1>{this.state.name}</h1>
            {this.showFaveHeart}
            <FavoriteButton
              toggleFavorite={() =>
                this.props.toggleFavorite(this.state.listing_id)
                }
              favorited={this.props.favorited}
            />
          </div>
          <ListingTags 
            area={this.state.area}
            superhost={this.state.superhost}
          />
          <ListingPhotos 
            name={this.state.name} 
            listing_id={this.state.listing_id} 
          />
          <ListingDetails 
            cost={this.state.cost} 
            beds={this.state.beds} 
            baths={this.state.baths}
            features={this.state.features}
            address={this.state.address}
          />
        </section>
      );
    }
  }
}

ExpandedListing.propTypes = {
  listingID: PropTypes.string,
  favorited: PropTypes.bool,
  toggleFavorite: PropTypes.func
};
