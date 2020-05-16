import React from "react";
import "./listing.css";
import { NavLink } from "react-router-dom";

export const Listing = ({ name, id, areaID }) => (
  <NavLink to={`/areas/${areaID}/listings/${id}`} >
    <div className="Listing" >
      <h3>{name}</h3>
      <img src={`/images/${id}_a.jpg`} alt={name} />
    </div>
  </NavLink>
);

export default Listing;