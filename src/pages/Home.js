import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ProductPreview from "../ components/ProductPreview";
// import { useGetProductsQuery } from "../services/appApi";
import categories from "../categories";
import "./Home.css";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import axios from "../axios";
import { updateProducts } from "../features/productSlice";

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts({ data: data.reverse() })));
    }, []);
    const products = useSelector((state) => state.products);

    const lastProducts = products.slice(0, 8);

    return (
        <div>
            <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png" className="home-banner" />;
            <div className="featured-products-container container mt-4">
                <h2>Last products</h2>
                <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts.map((product) => (
                        <ProductPreview {...product} />
                    ))}
                </div>
                <div>
                    <Link to="/category/all" style={{ textAlign: "right", display: "block", textDecoration: "none" }}>
                        See more {">>"}
                    </Link>
                </div>
            </div>
            <div className="sale__banner--container mt-4">
                <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png" />
            </div>
            <div className="recent-products-container container mt-4">
                <h2>Categories</h2>
                <Row>
                    {categories.map((category) => (
                        <LinkContainer to={`/category/${category.name.toLowerCase()}`}>
                            <Col md={4}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0,0,0.4)), url(${category.img})`, gap: "10px" }} className="category-tile">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default Home;
