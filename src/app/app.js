import './app.css';
import React, { Component } from 'react'
import SignIn from '../sign-in/sign-in';
import AreaView from '../area-view/area-view';
import NavBar from '../nav-bar/nav-bar';
import Listings from '../listings/listings';
import { Switch, Route, Redirect } from 'react-router-dom';

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      name: "",
      email: "",
      purpose: "",
      signedIn: false
    }
  }

  updateLogin = info => {
    this.setState({ ...info, signedIn: true });
    console.log(this.state.signedIn);
    
  }

  signOut = () => {
    this.setState({
      name: "",
      email: "",
      purpose: "",
      signedIn: false
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.signedIn && (
          <NavBar
            name={this.state.name}
            purpose={this.state.purpose}
            signOut={this.signOut}
          />
        )}
        <Switch>
          <Route path="/areas/:area_id/" render={({ match }) => (
            <Listings area={match.params.area_id} />
          )} /> 
          <Route path="/areas/" component={AreaView} />
          <Route
            path="/"
            component={() => (
              <SignIn updateLogin={this.updateLogin} signedIn={this.state.signedIn} />
            )}
          />
        </Switch>
      </div>
    );
  }
}


export default App
