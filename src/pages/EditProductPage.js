import React, { useEffect, useState } from "react";
import { Form, Container, Button, Row, Col, Alert } from "react-bootstrap";
import { useUpdateProductMutation } from "../services/appApi";
import { useNavigate, useParams } from "react-router-dom";
import "./NewProductPage.css";
import axios from "../axios";

function EditProductPage() {
    const { id } = useParams();
    console.log("product id is ", id);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const [updateProduct, { isError, error, isLoading, isSuccess }] = useUpdateProductMutation();
    const [imgToRemove, setImgToRemove] = useState(null);
    useEffect(() => {
        axios
            .get(`/products/${id}`)
            .then(({ data }) => {
                const product = data.product;
                setName(product.name);
                setDescription(product.description);
                setCategory(product.category);
                setImages(product.pictures);
                setPrice(product.price);
            })
            .catch((e) => console.log(e));
    }, [id]);
    function handleRemoveImg(imgObj) {
        console.log("handle remove called");
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description || !price || !category || !images.length) {
            return alert("Please fill out all the fields");
        }
        updateProduct({ id, name, description, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                alert("product updated");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        });
    }

    const showWidget = () => {
        let widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "learn-code-10",
                uploadPreset: "dcizdwph",
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    };
    return (
        <Container style={{ minHeight: "100vh" }} className="signup__container">
            <Row>
                <Col md={6} className="signup__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="text-center">Edit product</h1>
                        {isSuccess && <p>Product edited with success</p>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group className="mb-3" controlId="formGroupName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupdescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" value={description} placeholder="Product description" style={{ height: "100px" }} required onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price($)</Form.Label>
                            <Form.Control type="number" value={price} placeholder="Price ($)" required onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="category" value={category}>
                                <option disabled selected>
                                    -- Select one --
                                </option>
                                <option value="phones">technology</option>
                                <option value="tablets">tablets</option>
                                <option value="laptops">laptops</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button onClick={showWidget} type="button">
                                Upload Images
                            </Button>
                            <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} />
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Button type="submit" disabled={isLoading || isSuccess}>
                                Update Product
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="login__image--container"></Col>
            </Row>
        </Container>
    );
}

export default EditProductPage;
