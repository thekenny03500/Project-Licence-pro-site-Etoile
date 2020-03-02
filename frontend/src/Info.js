import React from 'react';


import {Container,Row,Col,Navbar,Nav,Button,Image} from 'react-bootstrap'
import {Link} from "react-router-dom";

export default class InfoStar extends React.Component {

    constructor(props) {
      super(props)

      this.star = this.props.history.location.state.star;
    }

    render() {
      return (
        <Container fluid="true">
          <Row>
            <Col>
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Info star</Navbar.Brand>
                <Nav className="mr-auto"/>
                <Link to="/"><Button variant="primary" size="lg" block>Back</Button></Link>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col/>
            <Col xs={9}>
              <Container className="Content">
                <Row>
                  <Col/>
                  <Col><Image src="https://vignette.wikia.nocookie.net/alldimensions/images/9/97/Sun.jpg" rounded /></Col>
                  <Col/>
                </Row>
                <Row>
                  <Col/>
                  <Col><span className="Label">Id => {this.star.id}</span></Col>
                  <Col/>
                </Row>
                <Row>
                  <Col/>
                  <Col><span className="Label">Name => {this.star.name}</span></Col>
                  <Col/>
                </Row>
                <Row>
                  <Col/>
                  <Col><span className="Label">Distance => {this.star.distance} al</span></Col>
                  <Col/>
                </Row>
                <Row>
                  <Col/>
                  <Col><Link to="/"><Button variant="primary" size="lg" block>Back</Button></Link></Col>
                  <Col/>
                </Row>
              </Container>
            </Col>
            <Col/>
          </Row>
        </Container>
      );
    }
}

/* 
<div>
          <h1>Info star</h1>
          <span className="Label">Id => {this.star.id}</span><br/>
          <span>Name => {this.star.name}</span><br/>
          <span>Galaxy => {this.star.galaxy}</span><br/>
          <span>Distance => {this.star.distance} al</span><br/>
          <Link to="/"><span>Back</span></Link> 
        </div>*/