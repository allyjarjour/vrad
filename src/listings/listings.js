import React, { Component } from "react";
import Listing from "../listing/listing";
import "./listings.css";

export default class Listings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
    };
  }

  componentDidMount() {
    if (!this.props.area) return; // for tests
    fetch("https://vrad-api.herokuapp.com/api/v1/areas/" + this.props.area)
      .then((response) => response.json())
      .then((data) =>
        Promise.all(
          data.listings.map((listing) =>
            fetch("https://vrad-api.herokuapp.com" + listing).then((response) =>
              response.json()
            )
          )
        )
      )
      .then((data) => this.setState({ listings: data }));
  }

  render() {
    const listings = this.state.listings.map((listing) => (
      <Listing
        key={listing.listing_id}
        name={listing.name}
        id={listing.listing_id}
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
