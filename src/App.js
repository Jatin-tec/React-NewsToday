import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import NewsContainer from "./components/NewsContainer";
import { BrowserRouter as Router, Switch} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Router exact path='/'>
              <NewsContainer key="general"  category="general" />
            </Router>
            <Router exact path='/business'>
              <NewsContainer key="business" category="business" />
            </Router>
            <Router exact path='/entertainment'>
              <NewsContainer key="entertainment" category="entertainment" />
            </Router>
            <Router exact path='/health'>
              <NewsContainer key="health" category="health" />
            </Router>
            <Router exact path='/science'>
              <NewsContainer key="science" category="science" />
            </Router>
            <Router exact path='/sports'>
              <NewsContainer key="sports" category="sports" />
            </Router>
            <Router exact path='/technology'>
              <NewsContainer key="technology" category="technology" />
            </Router>
          </Switch>
        </Router>
      </div>
    );
  }
}
