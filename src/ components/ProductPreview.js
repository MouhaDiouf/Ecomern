import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./ProductPreview.css";

function ProductPreview({ _id, title, price, category, name, pictures }) {
    return (
        <LinkContainer to={`/product/${_id}`} style={{ cursor: "pointer", width: "13rem", margin: "10px" }}>
            <Card style={{ width: "20rem", margin: "10px" }}>
                <Card.Img
                    variant="top"
                    className="product-preview-img"
                    src={pictures[0].url || "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=694&q=80"}
                />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Badge bg="warning" text="dark">
                        {category}
                    </Badge>
                    <br />
                </Card.Body>
            </Card>
        </LinkContainer>
    );
}

export default ProductPreview;
