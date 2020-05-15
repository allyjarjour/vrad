import React from "react";
import "./listing.css";

export const Listing = ({ name, id }) => (
  <div className="Listing">
    <h3>{name}</h3>
    <img src={`/images/${id}_a.jpg`} alt={name} />
  </div>
);

export default Listing;