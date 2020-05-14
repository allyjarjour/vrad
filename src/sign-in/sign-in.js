import "./sign-in.css";
import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      purpose: "",
    };
    
    this.signedIn = false;
    this.nameClass = "";
    this.emailClass = "";
    this.purposeClass = "";
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  async signIn(e) {
    e.preventDefault();

    // check if inputs are filled
    let allFilled = true;
    for (const key in this.state) {
      if (typeof this.state[key] !== "string") continue;
      if (!this.state[key]) {
        this[key + "Class"] = "error"; // adjust classes of inputs
        allFilled = false;
      } else {
        this[key + "Class"] = "";
      }
    }

    if (allFilled) {
      this.signedIn = true;
      await this.forceUpdate();
      this.props.updateLogin(this.state);
    } 
    else {
      this.forceUpdate();
    } 
  }

  render() {
    if (this.signedIn) {
      return <Redirect to="/areas/" />
    }

    return (
      <div className="Sign-In-page" data-testid="background-img">
        <h1>vrad</h1>
        <form className="Sign-In-form">
          <label htmlFor="name">Name</label>
          <input
            className={this.nameClass}
            type="text"
            name="name"
            onChange={this.change}
            value={this.state.name}
            placeholder="Name"
          />
          <label htmlFor="email">Email</label>
          <input
            className={this.emailClass}
            type="text"
            name="email"
            onChange={this.change}
            value={this.state.email}
            placeholder="Email"
          />
          <select
            className={this.purposeClass}
            name="purpose"
            onChange={this.change}
          >
            <option disabled selected value>
              Choose one
            </option>
            <option value="vacation">Vacation</option>
            <option value="business">Business</option>
            <option value="other">Other</option>
          </select>
          <button onClick={this.signIn.bind(this)}>Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
