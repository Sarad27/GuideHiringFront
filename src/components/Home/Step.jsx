import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import "./step.css"

const Step = () =>{

    return(
       <Container >
        <Row className="steps" >
            <Col md={3} className="step_works" > How Yatri Works </Col>
            <Col md={3}>
                <p className="step_heading">Step 1</p>
                <p className="step_detail">Select your Destination</p>
            </Col>
            <Col md={3}>
                <p className="step_heading">Step 2</p>
                <p className="step_detail">Choose a Guide</p>
            </Col>
            <Col md={3}>
                <p className="step_heading">Step 3</p>
                <p className="step_detail">Explore</p>
            </Col>
        </Row>
       </Container>
    )

}


export default Step;