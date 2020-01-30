import React, { Component } from "react";

import List from './List'
import Add from './Add'

import {
  Router,
  Switch,
  Route
} from "react-router-dom";


import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default class App extends Component  {

    constructor(props) {
        super(props)
        this.state = { list: [] }
        this.submit = this.submit.bind(this)
    }

    componentDidMount() {
        fetch(`http://localhost:5080/api/stars`)
            .then((response) => {
                console.log("YEESS");
                response.json().then((stars)=>{
                    console.log(stars);
                    this.setState((prevState, props) => {
                        prevState.list = stars;
                        return prevState;
                    });
                });
            })
            .catch(console.log("ERROR"));
    }

    submit(event) {
        const data = new FormData(event.target);
        event.preventDefault();
        history.push("/");
        this.setState((prevState, props) => {
            prevState.list = [...prevState.list, data.get('name')]
            return prevState
        })
    }

    render () {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/add">
                        <Add submit={this.submit} />
                    </Route>
                    <Route exact path="/">
                        <List list={ this.state.list }/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}