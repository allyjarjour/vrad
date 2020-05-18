import React, { Component } from "react";
import Listing from "../listing/listing";
import "./favorite-listings.css";

export default class FavoriteListings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
    };
  }

  componentDidMount() {
    Promise.all(
      this.props.favorites.map((favId) =>
        fetch(
          "https://vrad-api.herokuapp.com/api/v1/listings/" + favId
        ).then((response) => response.json())
      )
    ).then((data) => this.setState({ listings: data }));
  }

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
