import React from 'react';
import {
    Link
  } from "react-router-dom";

export default class ErrorPersoComponent extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
            <h1>{this.props.error.code} -> {this.props.error.stack}</h1>
      );
    }
}