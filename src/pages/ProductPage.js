import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, ButtonGroup, Form, Badge } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./ProductPage.css";
import SimilarProduct from "../ components/SimilarProduct";
import { useAddToCartMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../axios";
import Loading from "../ components/Loading";
import { LinkContainer } from "react-router-bootstrap";
import ToastMessage from "../ components/ToastMessage";

//https://n7nqziuw1z4b1r6k2adhav10-wpengine.netdna-ssl.com/wp-content/uploads/2020/03/Brooklinen-Product-Page-1024x579.png.webp
function ProductPage() {
    const { id } = useParams();
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };
    const user = useSelector((state) => state.user);
    const [addToCart, { isSuccess }] = useAddToCartMutation();
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);

    const handleDragStart = (e) => e.preventDefault();
    useEffect(() => {
        axios.get(`/products/${id}`).then(({ data }) => {
            setProduct(data.product);
            setSimilar(data.similar);
        });
    }, [id]);

    if (!product) {
        return <Loading />;
    }

    const images = product.pictures.map((picture) => <img className="product__carousel--image" src={picture.url} onDragStart={handleDragStart} />);

    let similarProducts = [];

    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div className="item" data-value={idx}>
                <SimilarProduct {...product} />
            </div>
        ));
    }

    return (
        <>
            <Container className="pt-4" style={{ position: "relative" }}>
                <Row>
                    <Col lg={6}>
                        <AliceCarousel mouseTracking items={images} controlsStrategy="alternate" />
                    </Col>
                    <Col lg={6} className="pt-4">
                        <h1>{product.name}</h1>
                        <p>
                            <Badge bg="primary">{product.category}</Badge>
                        </p>
                        <p className="product--price">${product.price}</p>
                        <p style={{ texAlign: "justify" }} className="py-3">
                            <strong>Description:</strong> {product.description}
                        </p>
                        {user && !user.isAdmin && (
                            <>
                                <ButtonGroup style={{ width: "90%" }}>
                                    <Form.Select size="lg" style={{ width: "40%", borderRadius: "0" }} aria-label="Default select example">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Form.Select>
                                    <Button size="lg" onClick={() => addToCart({ userId: user._id, productId: id, price: product.price, image: product.pictures[0].url })} disabled={!user}>
                                        Add to cart
                                    </Button>
                                </ButtonGroup>
                            </>
                        )}
                        {user && user.isAdmin && (
                            <>
                                <LinkContainer to={`/product/${product._id}/edit`}>
                                    <Button size="lg">Edit Product</Button>
                                </LinkContainer>
                            </>
                        )}
                        {isSuccess && <ToastMessage item={product.name} bg="info" />}
                    </Col>
                </Row>
                <div className="my-4">
                    <h2>Similar products</h2>
                    <div className="d-flex justify-content-center align-items-center flex-wrap">
                        <AliceCarousel mouseTracking items={similarProducts} responsive={responsive} controlsStrategy="alternate" />
                    </div>
                </div>
            </Container>
        </>
    );
}

export default ProductPage;
