import React from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

function Navigation() {
    const user = useSelector((state) => state.user);
    console.log("user", user);
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Ecom</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <i className="fas fa-shopping-cart"></i>
                            </Nav.Link>
                        </LinkContainer>
                        {!user && (
                            <NavDropdown title="Account" id="basic-nav-dropdown">
                                <LinkContainer to="/signup">
                                    <NavDropdown.Item>Signup</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}

                        {user && (
                            <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                                <LinkContainer to="/account">
                                    <NavDropdown.Item>Your account</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/cart">
                                    <NavDropdown.Item>Cart</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <Button variant="danger">Logout</Button>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
