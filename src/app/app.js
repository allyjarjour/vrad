import './app.css';
import React, { Component } from 'react'
import SignIn from '../sign-in/sign-in';
import AreaView from '../area-view/area-view';
import { Switch, Route } from 'react-router-dom';

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
        <Switch>
          <Route path="/areas/" component={AreaView} />
          <Route path="/" component={() => <SignIn updateLogin={this.updateLogin} />} />
        </Switch>
      </div>
    )
  }
}

export default App
