import React, { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";

import './App.css';
import {Col, Form, FormControl, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import GenerateQR from "./GenerateQR";
import ScanQR from "./ScanQR";
import PictureQR from "./PictureQR";

const ExampleToast: React.FC = ({
                                    children,
                                }) => {
    const [show, toggleShow] = useState(true);

    return (
        <>
            {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
            <Toast show={show} onClose={() => toggleShow(false)}>
                <Toast.Header>
                    <strong className="mr-auto">React-Bootstrap</strong>
                </Toast.Header>
                <Toast.Body>{children}</Toast.Body>
            </Toast>
        </>
    );
};

const App = () => (
    <Router>
        <Navbar bg="light">
            {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
            {/*<Nav.Link href="#home">Home</Nav.Link>*/}
            {/*<Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">*/}
            <Container>
                <Nav className="mr-auto">

                    <NavLink exact
                             to="/"
                             className="navbar-brand"
                    >
                        QR
                    </NavLink>

                    <NavLink exact
                             to="/"
                             className="nav-link"
                             activeClassName="active"
                    >
                        Generate
                    </NavLink>

                    <NavLink
                        to="/scan"
                        className="nav-link"
                        activeClassName="active"
                    >
                        Scan
                    </NavLink>

                    <NavLink
                        to="/from-pic"
                        className="nav-link"
                        activeClassName="active"
                    >
                        From Pic
                    </NavLink>
                </Nav>
            </Container>
        </Navbar>
        <Container>
            <Row>
                <Col>
                    <Switch>
                        <Route exact path="/">
                            <GenerateQR/>
                        </Route>
                        <Route path="/scan">
                            <ScanQR/>
                        </Route>
                        <Route path="/from-pic">
                            <PictureQR/>
{/*                            <Jumbotron>
                                <h1 className="header">Welcome To React-Bootstrap</h1>
                                <ExampleToast>
                                    We now have Toasts
                                    <span role="img" aria-label="tada">🎉</span>
                                </ExampleToast>
                            </Jumbotron>*/}
                        </Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
    </Router>
);

export default App;
