import React, { Component } from 'react'
import './area-view.css'

export default class AreaView extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      areaButtons: [],
      areaCodes: {}
    }
  }
  
  componentDidMount() {
    fetch("https://vrad-api.herokuapp.com/api/v1/areas")
      .then(response => response.json())
      .then(data => {
        this.setState({
          areaCodes: data.areas.reduce((acc, area) => {
            const id = area.details.match(/\d{3}/g);
            acc[id] = area.area;
            return acc;
          }, {})
        });
      
        return Promise.all(
          data.areas.map((area) => 
            fetch(
              "https://vrad-api.herokuapp.com" + area.details
            ).then((response) => response.json())
          )
        );
      }).then(data => data.forEach(area => this.makeButton(area)));
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
          <p>{about}</p>
        </div>,
      ],
    });
  }

  render() {
    return (
      <div className="Area-View">
        {this.state.areaButtons}
      </div>
    );
  }
}