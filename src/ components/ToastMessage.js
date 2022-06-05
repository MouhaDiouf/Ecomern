import React, { useState } from "react";
import { Button, Col, Row, Toast, ToastContainer } from "react-bootstrap";

function ToastMessage({ item, bg }) {
    const [show, setShow] = useState(true);

    return (
        <ToastContainer position="bottom-right" className="toast-container">
            <Toast bg={bg} onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Product added to cart</strong>
                    <small>Now</small>
                </Toast.Header>
                <Toast.Body>{item} successfully added to cart</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default ToastMessage;
