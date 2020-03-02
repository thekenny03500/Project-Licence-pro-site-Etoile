import React from 'react';
import {
    Link
  } from "react-router-dom";


import {Alert} from 'react-bootstrap'

export default class ErrorPersoComponent extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Alert variant="danger">
          <Alert.Heading>{this.props.error.code}</Alert.Heading>
          <p>{this.props.error.stack}</p>
        </Alert>
      );
    }
}