import React, { Component } from "react";
import "./nav-bar.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };
  }

  action = (cb) => {
    this.setState({ showMenu: false });
    cb && cb();
  };

  render() {
    const userName = this.props.name.split(" ")[0];
    let welcomeString = `Welcome, ${userName}! `;
    switch (this.props.purpose) {
      case "vacation":
        welcomeString += "Enjoy your stay!";
        break;
      case "business":
        welcomeString += "Stay productive!";
        break;
      default:
        break;
    }
    return (
      <>
        <header className="Nav-Bar" data-testid="nav-bar">
          <Link className="logo" to="/areas/">
            <h3>vrad</h3>
          </Link>
          <p className="nav-welcome">{welcomeString}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            onClick={() => this.setState({ showMenu: !this.state.showMenu })}
            data-testid="menu-button"
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
          </svg>
        </header>
        {this.state.showMenu && (
          <div className="menu">
            <Link to="/favorites/">
              <button onClick={() => this.action()}>Favorites</button>
            </Link>
            <Link to="/">
              <button
                onClick={() => this.action(this.props.signOut)}
                className="danger-button"
              >
                Sign Out
              </button>
            </Link>
          </div>
        )}
      </>
    );
  }
}

NavBar.propTypes = {
  name: PropTypes.string,
  purpose: PropTypes.string,
  signOut: PropTypes.func,
};

export default NavBar;
