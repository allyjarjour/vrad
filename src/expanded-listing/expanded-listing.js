import React, { Component } from "react";
import "./expanded-listing.css";
import PropTypes from "prop-types";
import FavoriteButton from "./favorite-button";

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

  componentDidMount() {
    fetch(
      "https://vrad-api.herokuapp.com/api/v1/listings/" + this.props.listingID
    )
      .then((res) => res.json())
      .then(({ address, area, details, listing_id, name }) =>
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
      );
  }

  render() {
    if (!this.props.listingID) {
      return (
        <div className="none-clicked">
          <p>Click on a listing to the left to read more</p>
        </div>
      );
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
          <div className="tags">
            <p className="area-tag">{this.state.area}</p>
            {this.state.superhost && <p className="host-tag">superhost</p>}
          </div>
          <div className="photo-container">
            <img
              className="photo-one"
              src={`/images/${this.state.listing_id}_a.jpg`}
              alt={this.state.name}
            />
            <img
              className="photo-two"
              src={`/images/${this.state.listing_id}_b.jpg`}
              alt={this.state.name}
            />
            <img
              className="photo-three"
              src={`/images/${this.state.listing_id}_c.jpg`}
              alt={this.state.name}
            />
          </div>
          <div className="listing-details">
            <div className="features">
              <h2>Listing details:</h2>
              <p>${this.state.cost}/night</p>
              <p>{this.state.beds} beds</p>
              <p>{this.state.baths} baths</p>
              {this.state.features &&
                this.state.features.map((feature, i) => (
                  <p key={i}>{feature}</p>
                ))}
            </div>
            <div className="address">
              <h2>Address</h2>
              <p>{this.state.address}, Denver, CO</p>
            </div>
          </div>
        </section>
      );
    }
  }
}

ExpandedListing.propTypes = {
  listingID: PropTypes.string,
};
