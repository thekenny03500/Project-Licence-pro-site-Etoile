import React from 'react';

import {
    Link
  } from "react-router-dom";

export default class InfoStar extends React.Component {

    constructor(props) {
      super(props)

      this.star = this.props.history.location.state.star;
    }

    render() {
      return (
        <div>
          <h1>Info star</h1>
          <span>Id => {this.star.id}</span><br/>
          <span>Name => {this.star.name}</span><br/>
          <span>Galaxy => {this.star.galaxy}</span><br/>
          <span>Distance => {this.star.distance} al</span><br/>
          <Link to="/"><span>Back</span></Link> 
        </div>
      );
    }
}