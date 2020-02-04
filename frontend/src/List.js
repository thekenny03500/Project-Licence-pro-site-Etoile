import React from 'react';

import {
    Link
  } from "react-router-dom";

export default class List extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
      let mythis = this;
      return (
        <div>
          <h1>List of stars</h1>
          <span>Name - Galaxy</span>
          <ul>
            { mythis.props.list.map(function(element, index) {
              return <li key={ index }><span>{ element.name } - { element.galaxy } - </span>                        
                        <Link to={{ pathname: ("/info/"+element.id) , state: {star: element}}}><span>info</span></Link> 
                        <span> - </span>
                        <Link to={{ pathname: ("/edit/"+element.id) , state: {star: element}}}><span>edit</span></Link>
                        <span> - </span>
                        <a href="" onClick={(e) =>{mythis.props.delete(e,element.id);}}><span>supprimer</span></a>
                      </li>
            })}
          </ul>
          <Link to="/add">Add</Link>
        </div>
      );
    }
}