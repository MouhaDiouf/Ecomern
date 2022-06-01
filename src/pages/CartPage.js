import { Elements } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Col, Container, Row, Table, Form, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRemoveFromCartMutation, useIncreaseCartProductMutation, useDecreaseCartProductMutation } from "../services/appApi";
import "./CartPage.css";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../ components/CheckoutForm";
import { Navigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51HSPjQLlgXiGBP1wSvNZUQjiyAIZXxGeRZpHJlK8sVd6vzbBA5BRT5zCARVVWQSZ6gacxoWGDtnTb41h3JC4S3kr00HU8COS2d");
function CartPage() {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);
    const [removeFromCart] = useRemoveFromCartMutation();
    const [increaseCart] = useIncreaseCartProductMutation();
    const [decreaseCart] = useDecreaseCartProductMutation();
    const [paying, setPaying] = useState(false);
    function handleDecrease(e, product) {
        const quantity = Number(e.target.nextElementSibling.innerHTML);
        if (quantity <= 0) return alert("Can't proceed");
        decreaseCart(product);
    }
    if (!user) {
        return <Navigate to="/" replace />;
    }

    return (
        <Container style={{ minHeight: "95vh" }} className="cart-container">
            <Row>
                <h1 className="pt-2 h3">Shopping cart</h1>
                {cart.length == 0 ? (
                    <Alert variant="info">Shopping cart is empty. Add products to your cart.</Alert>
                ) : (
                    <Elements stripe={stripePromise}>
                        <CheckoutForm total={cart.total} paying={paying} setPaying={setPaying} />
                    </Elements>
                )}

                <Col md={5}>
                    {cart.length > 0 && (
                        <>
                            <Table responsive="sm" className="cart-table">
                                <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>
                                                <i className="fa fa-times" style={{ marginRight: 10, cursor: "pointer" }} onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })}></i>
                                                <img src={item.pictures[0].url} style={{ width: 100, height: 100, objectFit: "cover" }} />
                                            </td>
                                            <td>${item.price}</td>
                                            <td>
                                                <span className="quantity-indicator">
                                                    <i className="fa fa-minus-circle" onClick={(e) => handleDecrease(e, { productId: item._id, price: item.price, userId: user._id })}></i> <span>{user.cart[item._id]}</span>{" "}
                                                    <i className="fa fa-plus-circle" onClick={() => increaseCart({ productId: item._id, price: item.price, userId: user._id })}></i>
                                                </span>
                                            </td>
                                            <td>${item.price * user.cart[item._id]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div>
                                <h3 className="h4 pt-4">Total: ${user.cart.total}</h3>
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default CartPage;
