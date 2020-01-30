import React from 'react';

export default class Add extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
      return (
        <div>
          <h1>Add star</h1>
          <form onSubmit={this.props.submit}>
              <input name="name" type="text" placeholder="Enter star name"/>
              <input name="galaxy" type="text" placeholder ="Enter galaxy name of this star"/>
              <input name="distance" type="number" step="0.00001" placeholder ="Enter distance of this star"/>
              <button type="submit">Send</button>
          </form>
        </div>
      );
    }
}