import React from "react";
import PropTypes from "prop-types";
import "./listing.css";
import { NavLink } from "react-router-dom";

export const Listing = ({ name, url, id, favorite }) => (
  <NavLink to={url} activeClassName="selected">
    <div className={`Listing${favorite ? " favorite" : ""}`}>
      <h3>{name}</h3>
      <img src={`/images/${id}_a.jpg`} alt={name} />
    </div>
  </NavLink>
);

Listing.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  favorite: PropTypes.bool,
};

export default Listing;
