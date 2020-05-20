import "./app.css";
import React, { Component } from "react";
import SignIn from "../sign-in/sign-in";
import AreaView from "../area-view/area-view";
import NavBar from "../nav-bar/nav-bar";
import Listings from "../listings/listings";
import FavoriteListings from "../favorite-listings/favorite-listings";
import ExpandedListing from "../expanded-listing/expanded-listing";
import { Switch, Route } from "react-router-dom";
import NoListingAlert from "../no-listing-alert/no-listing-alert";

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

    if (window) window.addEventListener("beforeunload", this.saveDataToLS);
  }

  componentDidMount() {
    this.populateDataFromLS();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.saveDataToLS);
  }

  populateDataFromLS = () => {
    if (!localStorage) return;
    const data = localStorage.getItem("userData");
    if (data) {
      this.setState({ ...JSON.parse(data), signedIn: true });
    }
  };

  saveDataToLS = () => {
    if (!localStorage) return;
    if (!this.state.signedIn) return;
    const data = {
      name: this.state.name,
      email: this.state.email,
      purpose: this.state.purpose,
      favorites: this.state.favorites,
    };
    localStorage.setItem("userData", JSON.stringify(data));
  };

  clearLSData = () => {
    if (!localStorage) return;
    localStorage.removeItem("userData");
  };

  updateLogin = (info) => {
    this.setState({ ...info, signedIn: true });
  };

  signOut = () => {
    this.setState({
      name: "",
      email: "",
      purpose: "",
      favorites: [],
      signedIn: false,
    });
    this.clearLSData();
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
            numFavorites={this.state.favorites.length}
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
                <NoListingAlert
                  alertType={
                    this.state.favorites.length
                      ? "reg-listing-alert"
                      : "favorites-alert"
                  }
                />
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
                <NoListingAlert alertType={"reg-listing-alert"} />
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
