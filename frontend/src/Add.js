import React from 'react';

export default class Add extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
      return (
        <div>
          <h1>Add</h1>
          <form onSubmit={this.props.submit}>
              <input name="name" type="text" />
              <button type="submit">Send</button>
          </form>
        </div>
      );
    }
}