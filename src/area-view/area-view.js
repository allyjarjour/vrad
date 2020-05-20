import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./area-view.css";
import { getAreas, getAreaData } from '../apiCalls'


export default class AreaView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      areaButtons: [],
      areaCodes: {},
    };
  }

  componentDidMount = async () => {
    let areas = await getAreas()
    this.setState({
      areaCodes: areas.areas.reduce((acc, area) => {
        const id = area.details.match(/\d{3}/g);
        acc[id] = area.area;
        return acc;
      }, {}),
    });
      let areaData = await getAreaData()
      areaData.forEach((area) => this.makeButton(area));
  }

  makeButton = ({ name, location, about, id }) => {
    const shortName = this.state.areaCodes[id];

    this.setState({
      areaButtons: [
        ...this.state.areaButtons,
        <div className="card" key={id}>
          <h1>{name}</h1>
          <h3>{shortName}</h3>
          <p>{location}</p>
          <p className="about-text">{about}</p>
          <Link to={`/areas/${id}/listings`}>
            <button>View listings &rarr;</button>
          </Link>
        </div>,
      ],
    });
  };

  render() {
    return (
      <div className="Area-View" data-testid="area-view">
        {this.state.areaButtons}
      </div>
    );
  }
}
