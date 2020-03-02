import React from 'react';

import {Container,Row,Col,Navbar,ListGroup,Button,DropdownButton,Dropdown} from 'react-bootstrap'

import {Link} from "react-router-dom";

export default class List extends React.Component {

    constructor(props) {
      super(props)
    }

    redirection(path){
      this.props.history.push(path);
    }

    render() {
      let mythis = this;
      return (
        <Container fluid="true">
            <Row>
              <Col>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                  <Navbar.Brand>List of stars</Navbar.Brand>
                </Navbar>
              </Col>
            </Row>
            <Row>
              <Col/>
              <Col xs={9}>
                <ListGroup>
                  { mythis.props.list.map(function(element, index) {
                  return <ListGroup.Item key={index}>
                            <Container fluid="true">
                              <Row>
                                <Col><span className="Label">{ element.name } - { element.galaxy } - </span></Col>
                                <Col sm={2}>
                                  <DropdownButton id="dropdown-basic-button" variant="primary" title="More">
                                    <Dropdown.Item onClick={()=>{mythis.redirection({ pathname: ("/info/"+element.id) , state: {star: element}});}}>Mode info</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>{mythis.redirection({ pathname: ("/edit/"+element.id) , state: {star: element}});}}>Edit star</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) =>{mythis.props.delete(e,element.id);}}>Delete star</Dropdown.Item>
                                  </DropdownButton>
                                </Col>
                              </Row>
                            </Container>
                          </ListGroup.Item>
                  })}
                </ListGroup>
              </Col>
              <Col/>
            </Row>
            <Row>
              <Col/>
              <Col>
                <Link to="/add"><Button variant="primary" size="lg" block>Add Star</Button></Link>
              </Col>
              <Col/>
            </Row>
        </Container>
      );
    }
}