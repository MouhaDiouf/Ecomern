import { Alert } from "react-bootstrap";
import React, { useState } from "react";

function AlertMessage({ variant, message }) {
    const [show, setShow] = useState(true);
    return (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
            <p>{message}</p>
        </Alert>
    );
}

export default AlertMessage;
