import React, {useEffect} from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import "./header.css"
import {Container} from "react-bootstrap";
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";


function Header(props){

    if(window.location.pathname === '/signUp' || window.location.pathname === '/login' ||
        window.location.pathname === '/signUp/TouristDetails' || window.location.pathname === '/signUp/GuideDetails' ){
        return null
    }

    return (

            <Container>
                <Navbar collapseOnSelect expand="lg"  variant="light">
                    <Navbar.Brand href="#home">
                        <img
                            src="/images/logo.png"
                            height="60"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">

                        </Nav>
                        <Nav>

                             <Link className="nav-link" to="/">Home</Link>
                             <Link className="nav-link" to="/">Destination</Link>
                            <Link className="nav-link" to="/">About</Link>

                            {props.data.user.isAuthenticated ? <Link className="nav-link" to="/profile">{props.data.user.user.name}</Link>  :
                                <>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link  href="/signUp"><button inline className="signUp">Sign Up</button></Nav.Link>
                                </>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>

    );
}

export default  Header;