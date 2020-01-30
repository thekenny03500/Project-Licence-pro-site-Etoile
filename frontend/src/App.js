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