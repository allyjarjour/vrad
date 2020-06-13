import React, { Component } from "react";
import PropTypes from "prop-types";
import Listing from "../listing/listing";
import "./listings.css";
import { getAreaListings } from '../apiCalls'


export default class Listings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
    };
  }

  componentDidMount = async () => {
    if (!this.props.area) return; // for tests
    let data = await getAreaListings(this.props.area)
    
    this.setState({ listings: data });
  }

  render() {
    const listings = this.state.listings.map((listing) => (
      <Listing
        areaID={this.props.area}
        key={listing.listing_id}
        name={listing.name}
        url={"/areas/" + this.props.area + "/listings/" + listing.listing_id}
        id={listing.listing_id}
        favorite={this.props.favorites.includes(Number(listing.listing_id))}
      />
    ));
    return (
      <main>
        <aside className="Listings" data-testid="listings">
          {listings}
        </aside>
      </main>
    );
  }
}

Listings.propTypes = {
  area: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  favorites: PropTypes.arrayOf(PropTypes.number),
};
