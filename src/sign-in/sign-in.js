import "./sign-in.css";
import React, { Component } from 'react'

export class SignIn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: "",
            email: "",
            purpose: ""
        }

        this.nameClass = "";
        this.emailClass = "";
        this.purposeClass = "";
    }

    change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }
    
    render() {
        return (
            <div className="Sign-In-page">
                <h1>vrad</h1>
                <form className="Sign-In-form">
                    <label for="name">Name</label>
                    <input className={this.nameClass} type="text" name="name" onChange={this.change} value={this.state.name} placeholder="Name" />
                    <label for="email">Email</label>
                    <input className={this.emailClass} type="text" name="email" onChange={this.change} value={this.state.email} placeholder="Email" />
                    <select className={this.purposeClass} name="purpose" onChange={this.change}>
                        <option disabled selected value>Choose one</option>
                        <option value="vacation">Vacation</option>
                        <option value="business">Business</option>
                        <option value="other">Other</option>
                    </select>
                    <button onClick={e => {
                        e.preventDefault(); 
                        let allFilled = true;
                        // check if inputs are filled
                        for (const key in this.state) {
                            if (!this.state[key]) {
                                this[key + "Class"] = "error";
                                allFilled = false;
                            } else {
                                this[key + "Class"] = "";
                            }
                        }

                        if (allFilled) this.props.updateLogin(this.state);
                        else this.forceUpdate();
                    }}>Sign In</button>
                </form>
            </div>
        )
    }
}

export default SignIn;
