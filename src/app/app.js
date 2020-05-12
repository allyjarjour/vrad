
import './app.css';

import React, { Component } from 'react'
import SignIn from '../sign-in/sign-in';

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       name: "",
       email: "",
       purpose: ""
    }
  }

  updateLogin = info => {
    this.setState(info);
  }

  render() {
    return (
      <div className="App">
        <SignIn updateLogin={this.updateLogin} />
        {this.state.name && <p>{this.state.name}</p>}
      </div>
    )
  }
}

export default App
