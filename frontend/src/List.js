import React from 'react';

import {
    Link
  } from "react-router-dom";

export default class List extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
      return (
        <div>
          <h1>List of stars</h1>
          <h0>UUID - Name - Galaxy - Distance</h0>
          <ul>
            { this.props.list.map(function(element, index) {
              return <li key={ index }>{ element.id } - { element.name } - { element.galaxy } - { element.distance } al</li>
            })}
          </ul>
          <Link to="/add">Add</Link>
        </div>
      );
    }
}