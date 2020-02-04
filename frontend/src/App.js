import React, { Component } from "react";
import Star from "./model/Star";

import List from './List';
import EditStar from './EditStar';
import InfoStar from './Info';

import {
  Router,
  Switch,
  Route
} from "react-router-dom";


import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default class App extends Component  {

    constructor(props) {
        super(props);
        this.state = { list: [] };
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:5080/api/stars`)
            .then((response) => {
                response.json().then((stars)=>{
                    console.log(stars);
                    this.setState((prevState, props) => {
                        prevState.list = stars;
                        return prevState;
                    });
                });
            })
            .catch((e) => console.error(e));
    }

    add(event) {
        const data = new FormData(event.target);
        event.preventDefault();
        let newStar = new Star(data.get("name"),data.get("galaxy"),data.get("distance"));
        fetch(`http://localhost:5080/api/stars`,{
           method: 'post',
           headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStar)
        }).then((response) => {
            response.json().then((star)=>{
                    console.log(star);
                    history.push("/");
                    this.setState((prevState, props) => {
                        prevState.list = [...prevState.list,star]
                        return prevState;
                    });
                });
        }).catch((e)=> console.error(e));
    }

    edit(event) {
        const data = new FormData(event.target);
        event.preventDefault();
        let idStar = data.get("id");
        let aStar = new Star(data.get("name"),data.get("galaxy"),data.get("distance"));
        fetch(`http://localhost:5080/api/stars/`+idStar,{
           method: 'put',
           headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aStar)
        }).then((response) => {
            console.log(aStar);
            this.setState((prevState, props) => {
                Object.assign(prevState.list.filter(star => star.id == idStar)[0],aStar);
                return prevState;
            });
            history.push("/");
        }).catch((e)=> console.error(e));
    }

    delete(event,id) {
        event.preventDefault();
        fetch(`http://localhost:5080/api/stars/`+id,{
           method: 'delete',
        }).then((response) => {
            this.setState((prevState, props) => {
                    prevState.list = prevState.list.filter(star => star.id != id );
                    return prevState;
            });
        }).catch((e)=> console.error(e));
    }


    render () {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/add">
                        <EditStar submit={this.add} />
                    </Route>
                    <Route path="/edit/:id" >
                        <EditStar history={history} submit={this.edit} />
                    </Route>
                    <Route path="/info/:id" >
                        <InfoStar history={history}/>
                    </Route>
                    <Route exact path="/">
                        <List list={ this.state.list } delete={this.delete}/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}