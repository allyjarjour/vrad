import React, { Component } from 'react';
import './expanded-listing.css';
import PropTypes from 'prop-types'


export default class ExpandedListing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            favorited: false
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.listingID !== prevProps.listingID) {
            this.componentDidMount();
        }
    }

    componentDidMount() {
        fetch("https://vrad-api.herokuapp.com/api/v1/listings/" + this.props.listingID)
        .then(res => res.json())
        .then(({address, area, details, listing_id, name}) => this.setState({
            name: name,
            address: address.street,
            area: area,
            beds: details.beds,
            baths: details.baths,
            cost: details.cost_per_night,
            features: details.features,
            listing_id: listing_id,
            superhost: details.superhost
        }))
    }

    displayFeatures = () => {
        debugger
        if(this.state.features) {
            console.log(this.state.features);
            return this.state.features.map((feature) => (<p>{feature}</p>))
        }
    }
    
    render () {
        if (!this.props.listingID) {
            return (
                <div className="none-clicked">
                    <p>Click on a listing to the left to read more</p>
                </div>
                )
        } else {
           return (
            <section className="details-section">
                <div className="listing-title-container" >
                    <h1>{this.state.name}</h1>
                    <svg className="unfavorited" xmlns="http://www.w3.org/2000/svg" 
                        width="24" height="24" viewBox="0 0 24 24">
                        <path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z"/>
                    </svg>
                </div>
                <div className="tags" >
                    <p className="area-tag">{this.state.area}</p>
                    {this.state.superhost && <p className="host-tag">superhost</p>}
                </div>
                <div className="photo-container">
                    <img className="photo-one" src={`/images/${this.state.listing_id}_a.jpg`} alt={this.state.name} />
                    <img className="photo-two" src={`/images/${this.state.listing_id}_b.jpg`} alt={this.state.name} />
                    <img className="photo-three" src={`/images/${this.state.listing_id}_c.jpg`} alt={this.state.name} />
                </div>
                <div className="listing-details">
                    <div className="features" >
                        <h2>Features</h2>
                        <p>{this.state.beds} beds</p>
                        <p>{this.state.baths} baths</p>
                        {this.state.features && this.state.features.map((feature , i)=> <p key={i}>{feature}</p>)}
                    </div>
                    <div className="address">
                        <h2>Address</h2>
                        <p>{this.state.address}, Denver, CO</p>
                    </div>
                </div>
            </section>
           )
        }
    }
}



