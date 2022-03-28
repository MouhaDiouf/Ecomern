import React from "react";
import { Col, Container, Row, Button, ButtonGroup, Form } from "react-bootstrap";
import Rating from "react-rating";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
// Look for alice css in app.css as well
import appleWatchFirst from "../images/apple-watch__second--slide.png";
import appleWatchThird from "../images/apple-watch__third--slide.png";
import "./ProductPage.css";

//https://n7nqziuw1z4b1r6k2adhav10-wpengine.netdna-ssl.com/wp-content/uploads/2020/03/Brooklinen-Product-Page-1024x579.png.webp
function ProductPage() {
    const handleDragStart = (e) => e.preventDefault();
    const items = [
        <img className="product__carousel--image" src={appleWatchFirst} onDragStart={handleDragStart} />,
        <img className="product__carousel--image" src={appleWatchThird} onDragStart={handleDragStart} />,
        <img className="product__carousel--image" src={appleWatchThird} onDragStart={handleDragStart} />,
    ];

    return (
        <>
            <Container className="pt-4">
                <Row>
                    <Col lg={6}>
                        <AliceCarousel mouseTracking items={items} controlsStrategy="alternate" />
                    </Col>
                    <Col lg={6} className="pt-4">
                        <h1>Apple watch</h1>
                        <p className="product--price">$431</p>
                        <div>
                            <Rating initialRating={4} />
                        </div>
                        <p style={{ texAlign: "justify" }} className="py-3">
                            Apple Watch is a wearable smartwatch that allows users to accomplish a variety of tasks, including making phone calls, sending text messages and reading email. Apple released the Apple Watch on April 24, 2015.
                        </p>
                        <ButtonGroup style={{ width: "90%" }}>
                            <Form.Select size="lg" style={{ width: "40%", borderRadius: "0" }} aria-label="Default select example">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                            <Button size="lg">Add to cart</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ProductPage;
