import React from 'react';
import ErrorPersoComponent from './ErrorPersoComponent'
import {Container,Row,Col,Navbar,Nav,Button,Form} from 'react-bootstrap'
import {Link} from "react-router-dom";

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
        <Container fluid="true">
          <Row>
            <Col>
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>{this.state.star?"Edit":"Add" } star</Navbar.Brand>
                <Nav className="mr-auto"/>
                <Link to="/"><Button variant="primary" size="lg" block>Back</Button></Link>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col/>
            <Col xs={9}>
              <Container fluid="true" className="Content">
                {this.state.error &&
                <Row>
                  <ErrorPersoComponent error={this.state.error}/>
                </Row>
                }

                <Row>
                  <Form className="fromEditAdd" onSubmit={(event) =>{
                      mythis.props.submit(event,mythis.state.star?mythis.state.star.id:"")
                      .then(()=> mythis.props.history.push("/"))
                      .catch((e)=> mythis.setState({ error:e }));
                  }} >
                    <Form.Group as={Row} controlId="name">
                      <Form.Label column sm={3}>
                        Name
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control required name="name" type="text" placeholder="Enter star name" defaultValue={this.state.star?this.state.star.name:"" } />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="galaxy">
                      <Form.Label column sm={3}>
                        Galaxy
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control required name="galaxy" type="text" placeholder="Enter galaxy name" defaultValue={this.state.star?this.state.star.galaxy:"" }/>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="distance">
                      <Form.Label column sm={3}>
                        Distance
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control required name="distance" type="number" placeholder="Enter distance of this star" defaultValue={this.state.star?this.state.star.distance:""} />
                      </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">Send</Button>
                  </Form>
                </Row>
              </Container>
            </Col>
            <Col/>
          </Row>
        </Container>
      );
    }
}