import React from 'react';

import {
    Link
  } from "react-router-dom";

import { Typography, Button } from 'antd';
const { Title, Text } = Typography;

export default class InfoStar extends React.Component {

    constructor(props) {
      super(props)

      this.star = this.props.history.location.state.star;
    }

    render() {
      return (
        <div>
          <Title>Info star</Title>
          <Text strong>
            <span>Id => {this.star.id}</span><br/>
            <span>Name => {this.star.name}</span><br/>
            <span>Galaxy => {this.star.galaxy}</span><br/>
            <span>Distance => {this.star.distance} al</span><br/>
          </Text>
          <Button type="primary">
            <Link to="/">Back</Link>
          </Button>
        </div>
      );
    }
}