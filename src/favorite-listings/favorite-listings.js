import React, { Component } from "react";
import PropTypes from "prop-types";
import Listing from "../listing/listing";
import { getFaveListings } from "../apiCalls";

export default class FavoriteListings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
    };
  }

  componentDidMount = async () => {
    let data = await getFaveListings(this.props.favorites);
    this.setState({ listings: data });
  };

  render() {
    const listings = this.state.listings.map((listing) => (
      <Listing
        key={listing.listing_id}
        name={listing.name}
        url={"/favorites/" + listing.listing_id}
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

FavoriteListings.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.number),
};
