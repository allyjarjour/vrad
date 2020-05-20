import "./sign-in.css";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      nameClass: "",
      email: "",
      emailClass: "",
      purpose: "",
      purposeClass: "",
    };
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  signIn = (e) => {
    e.preventDefault();

    // check if inputs are filled
    let allFilled = true;
    for (const key in this.state) {
      if (key.includes("Class")) continue;

      if (!this.state[key]) {
        this.setState({ [key + "Class"]: "error" }); // adjust classes of inputs
        allFilled = false;
      } else {
        this.setState({ [key + "Class"]: "" });
      }
    }

    if (allFilled) {
      const { name, email, purpose } = this.state;
      this.props.updateLogin({ name, purpose, email });
    }
  };

  render() {
    if (this.props.signedIn) {
      return <Redirect to="/areas/" />;
    }
    return (
      <div className="Sign-In-page" data-testid="login-page">
        <h1>vrad</h1>
        <form className="Sign-In-form">
          <label htmlFor="name">Name</label>
          <input
            className={this.state.nameClass}
            type="text"
            name="name"
            onChange={this.change}
            value={this.state.name}
            placeholder="Name"
          />
          <label htmlFor="email">Email</label>
          <input
            className={this.state.emailClass}
            type="text"
            name="email"
            onChange={this.change}
            value={this.state.email}
            placeholder="Email"
          />
          <select
            className={this.state.purposeClass}
            name="purpose"
            onChange={this.change}
            defaultValue="error"
          >
            <option disabled value="error">
              Choose one
            </option>
            <option value="vacation">Vacation</option>
            <option value="business">Business</option>
            <option value="other">Other</option>
          </select>
          <button onClick={this.signIn}>Sign In</button>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  updateLogin: PropTypes.func,
  signedIn: PropTypes.bool,
};

export default SignIn;
