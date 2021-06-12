import React from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import "./body.css"

function Body(){
    return(
        <Container>
            <Row>
                <Col lg={5} className="main_info">
                    <h1 className="body_h1">Beautiful React Templates for you.</h1>
                    <p>Our templates are easy to setup, understand and customize.
                        Fully modular components with a variety of pages and components.</p>

                    <h2 style={{marginTop: "55px"}}>Why Us</h2>

                    <ul>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{color: "purple"}}>
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>

                            </svg>
                            <p className="li_whyUs">Youth Empowerment</p>
                        </li>

                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{color: "purple"}}>
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>

                            </svg>
                            <p className="li_whyUs">Cultural Representation</p>
                        </li>

                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{color: "purple"}}>
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>

                            </svg>
                            <p className="li_whyUs">Resonable Cost</p>
                        </li>
                    </ul>


                </Col>
                <Col lg={7}>
                    <div>
                        <img className="mainImage" src="/images/home-image.svg" />
                    </div>


                </Col>
            </Row>
        </Container>
    )
}

export default Body;