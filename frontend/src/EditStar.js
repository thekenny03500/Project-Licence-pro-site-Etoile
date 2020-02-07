import React from 'react';
import {Link} from 'react-router-dom';
import ErrorPersoComponent from './ErrorPersoComponent'

export default class EditStar extends React.Component {

    constructor(props) {
      super(props);
      this.state = {};
      if(this.props.history.location.state && this.props.history.location.state.star)
      {
        this.state.star = this.props.history.location.state.star;
      }
    }

    render() {
      let mythis = this;
      return (
        <div>
          <h1>{this.state.star?"Edit":"Add" } star</h1>
          {this.state.error &&
            <ErrorPersoComponent error={this.state.error}/>
          }
          <form onSubmit={(event) =>{
              mythis.props.submit(event,mythis.state.star?mythis.state.star.id:"")
              .then(()=> mythis.props.history.push("/"))
              .catch((e)=> mythis.setState({ error:e }));
          }}>
              <input name="name" type="text" placeholder="Enter star name" defaultValue={this.state.star?this.state.star.name:"" } />
              <input name="galaxy" type="text" placeholder ="Enter galaxy name of this star" defaultValue={this.state.star?this.state.star.galaxy:"" }/>
              <input name="distance" type="number" step="0.00001" placeholder ="Enter distance of this star" defaultValue={this.state.star?this.state.star.distance:"" }/>
              <button type="submit">Send</button>
          </form>
          <Link to="/"><span>Back</span></Link> 
        </div>
      );
    }
}