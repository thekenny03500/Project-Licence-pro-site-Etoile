import React from 'react';
import {
    Link
  } from "react-router-dom";

  import { Typography, Button } from 'antd';
  const { Title, Text } = Typography;

export default class EditStar extends React.Component {

    constructor(props) {
      super(props)
      if(this.props.history && this.props.history.location.state.star)
      {
        this.star = this.props.history.location.state.star;
      }
    }

    render() {
      return (
        <div>
          <Title>{this.star?"Edit":"Add" } star</Title>
          <form onSubmit={this.props.submit}>
              <input name="id" type="hidden" value={this.star?this.star.id:"" }/>
              <input name="name" type="text" placeholder="Enter star name" defaultValue={this.star?this.star.name:"" } />
              <input name="galaxy" type="text" placeholder ="Enter galaxy name of this star" defaultValue={this.star?this.star.galaxy:"" }/>
              <input name="distance" type="number" step="0.00001" placeholder ="Enter distance of this star" defaultValue={this.star?this.star.distance:"" }/>
              <button type="submit">Send</button>
          </form>
          <Button type="primary">
            <Link to="/">Back</Link>
          </Button>
        </div>
      );
    }
}