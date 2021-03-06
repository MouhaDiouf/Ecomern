import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../ components/Loading";
import Pagination from "../ components/Pagination";
import ProductPreview from "../ components/ProductPreview";
import axios from "../axios";
import "./CategoryPage.css";

const CategoryPage = () => {
    const { category } = useParams();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        setLoading(true);
        axios
            .get(`/products/category/${category}`)
            .then(({ data }) => {
                setLoading(false);
                setProducts(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e.message);
            });
    }, [category]);

    if (loading) {
        return <Loading />;
    }

    const productSearch = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="category-page-container">
            <div className={`pt-3 ${category}-banner-container category-banner-container`}>
                <h1 className="text-center">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            </div>
            <div className="filters-container d-flex justify-content-center pt-4 pb-4">
                <input type="search" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            {productSearch.length === 0 ? (
                <h1 className="text-center">No products in that category</h1>
            ) : (
                <Container>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            {productSearch.length === 0 && searchTerm ? <h2 className="text-center">No results found</h2> : <Pagination data={productSearch} RenderComponent={ProductPreview} pageLimit={1} dataLimit={10} />}
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
};

export default CategoryPage;
