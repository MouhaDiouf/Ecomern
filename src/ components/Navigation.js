import axios from "../axios";
import React, { useRef, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logoutUser, resetNotifications } from "../features/userSlice";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
function Navigation() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const bellRef = useRef(null);
    const notificationsRef = useRef(null);
    const [bellPos, setBellPos] = useState({});
    const navigate = useNavigate();
    // https://blog.greenroots.info/a-notification-timeline-using-react
    function handleLogout() {
        dispatch(logoutUser());
        navigate("/login");
    }

    const unreadNotifications = user?.notifications.reduce((acc, current) => {
        if (current.status == "unread") {
            return acc + 1;
        }
        return acc;
    }, 0);

    function handleToggleNotifications() {
        const position = bellRef.current.getBoundingClientRect();
        setBellPos(position);
        notificationsRef.current.style.display = notificationsRef.current.style.display == "block" ? "none" : "block";
        dispatch(resetNotifications());
        axios.post(`/users/${user._id}/updateNotifications`);
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Ecom</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!user && (
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}

                        {user && !user.isAdmin && (
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>
                                    {user?.cart.count > 0 && (
                                        <span class="badge badge-warning" id="lblCartCount">
                                            {user.cart.count}
                                        </span>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                        )}
                        {user && (
                            <>
                                <Nav.Link style={{ position: "relative" }}>
                                    <i className="fas fa-bell" ref={bellRef} data-count={unreadNotifications || null} onClick={handleToggleNotifications}></i>
                                </Nav.Link>
                                <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                                    {user.isAdmin && (
                                        <LinkContainer to="/dashboard">
                                            <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                        </LinkContainer>
                                    )}

                                    {!user.isAdmin && (
                                        <>
                                            <LinkContainer to="/orders">
                                                <NavDropdown.Item>My Orders</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/cart">
                                                <NavDropdown.Item>Cart</NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                                    )}
                                    {user.isAdmin && (
                                        <>
                                            <LinkContainer to="/new-product">
                                                <NavDropdown.Item>Create Product</NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                                    )}
                                    <NavDropdown.Divider />
                                    <Button variant="danger" onClick={() => handleLogout()}>
                                        Logout
                                    </Button>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <div className="notifications-container" ref={notificationsRef} style={{ position: "absolute", top: bellPos.top + 50, left: bellPos.left, display: "none" }}>
                {user?.notifications.length > 0 ? (
                    user.notifications.map((notification) => (
                        <p className={`notification-${notification.status}`}>
                            {notification.message}
                            <br /> <span>{notification.time}</span>
                        </p>
                    ))
                ) : (
                    <p>No notifications yet</p>
                )}
            </div>
        </Navbar>
    );
}

export default Navigation;
