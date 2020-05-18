import "./app.css";
import React, { Component } from "react";
import SignIn from "../sign-in/sign-in";
import AreaView from "../area-view/area-view";
import NavBar from "../nav-bar/nav-bar";
import Listings from "../listings/listings";
import FavoriteListings from "../favorite-listings/favorite-listings";
import ExpandedListing from "../expanded-listing/expanded-listing";
import { Switch, Route } from "react-router-dom";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      purpose: "",
      signedIn: false,
      favorites: [],
    };
  }

  updateLogin = (info) => {
    this.setState({ ...info, signedIn: true });
    console.log(this.state.signedIn);
  };

  signOut = () => {
    this.setState({
      name: "",
      email: "",
      purpose: "",
      signedIn: false,
    });
  };

  addFavorite = (id) =>
    this.setState({
      favorites: [...this.state.favorites, id],
    });

  removeFavorite = (id) => {
    const newFaves = this.state.favorites.filter((fid) => fid !== id);
    this.setState({
      favorites: newFaves,
    });
  };

  toggleFavorite = (id) => {
    if (this.isFavorite(id)) {
      this.removeFavorite(id);
    } else {
      this.addFavorite(id);
    }
  };

  isFavorite = (id) => this.state.favorites.includes(Number(id));

  render() {
    return (
      <div className="App">
        {this.state.signedIn && (
          <NavBar
            name={this.state.name}
            purpose={this.state.purpose}
            signOut={this.signOut}
          />
        )}
        <Switch>
          <Route
            path="/favorites/:id"
            component={({ match }) => (
              <section className="listings-page">
                <FavoriteListings favorites={this.state.favorites} />
                <ExpandedListing
                  listingID={match.params.id}
                  favorited={true}
                  toggleFavorite={this.toggleFavorite}
                />
              </section>
            )}
          />
          <Route
            path="/favorites/"
            component={() => (
              <section className="listings-page">
                <FavoriteListings favorites={this.state.favorites} />
                <ExpandedListing />
              </section>
            )}
          />
          <Route
            path="/areas/:area_id/listings/:listing_id/"
            render={({ match }) => (
              <section className="listings-page">
                <Listings
                  area={match.params.area_id}
                  favorites={this.state.favorites}
                />
                <ExpandedListing
                  listingID={match.params.listing_id}
                  favorited={this.isFavorite(match.params.listing_id)}
                  toggleFavorite={this.toggleFavorite}
                />
              </section>
            )}
          />
          <Route
            path="/areas/:area_id/"
            render={({ match }) => (
              <section className="listings-page">
                <Listings
                  area={match.params.area_id}
                  favorites={this.state.favorites}
                />
                <ExpandedListing />
              </section>
            )}
          />
          <Route path="/areas/" component={AreaView} />
          <Route
            path="/"
            component={() => (
              <SignIn
                updateLogin={this.updateLogin}
                signedIn={this.state.signedIn}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
