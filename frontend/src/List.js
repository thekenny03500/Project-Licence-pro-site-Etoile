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
          <h1>List</h1>
          <ul>
            { this.props.list.map(function(element, index) {
              return <li key={ index }>{ element }</li>
            })}
          </ul>
          <Link to="/add">Add</Link>
        </div>
      );
    }
}