import React, { useState } from "react";
import { Form, Button, Row, Container, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import "./Signup.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isLoading, error, isError }] = useLoginMutation();

    function handleSignup(e) {
        e.preventDefault();
        login({ email, password });
    }

    return (
        <Container style={{ minHeight: "100vh" }} className="signup__container">
            <Row>
                <Col md={6} className="signup__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSignup}>
                        <h1 className="text-center">Login to your account</h1>
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading}>
                                Login
                            </Button>
                        </Form.Group>

                        <p className="pt-3 text-center">
                            Don't have a account? <Link to="/signup">Signup</Link>
                        </p>
                    </Form>
                </Col>

                <Col md={6} className="login__image--container"></Col>
            </Row>
        </Container>
    );
}

export default Login;
