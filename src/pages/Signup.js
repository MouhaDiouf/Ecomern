import React, { useState } from "react";
import { Form, Button, Row, Container, Col } from "react-bootstrap";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    function handleSignup(e) {
        e.preventDefault();
    }
    return (
        <Container style={{ minHeight: "100vh" }}>
            <Row>
                <Col md={6}>
                    <Form style={{ width: "100%" }} onSubmit={handleSignup}>
                        <h1 className="text-center">Create account</h1>
                        <Form.Group className="mb-3" controlId="formGroupName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Button>Signup</Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6}>
                    <h2>Image here</h2>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;
