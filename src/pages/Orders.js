import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Badge, Container, Table, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./Orders.css";
import socketConnection from "../socketConnection";
import { addNotification } from "../features/userSlice";
function Orders() {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [fetchingOrder, setFetchingOrder] = useState(true);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get(`/users/${user._id}/orders`).then(({ data }) => {
            console.log("data from orders", data);
            setLoading(false);
            setOrders(data);
        });
    }, [refresh]);
    const dispatch = useDispatch();

    socketConnection.off("notification").on("notification", (msgObj, user_id) => {
        if (user_id == user._id) {
            dispatch(addNotification(msgObj));
            setRefresh(!refresh);
        }
    });
    socketConnection.off("new-order").on("new-order", (msg) => {
        alert("NEW ORDER RECEIVED");

        if (user.isAdmin) {
            dispatch(addNotification(msg));
        }
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const allProducts = useSelector((state) => state.products);
    const [orderProductsToShow, setOrderProductsToShow] = useState(null);

    const handleShow = async (order) => {
        setShow(true);
        setFetchingOrder(true);
        // only the product ids have length of 24
        const orderProductsObj = order.products;
        const ordersProductsArr = allProducts.filter((product) => orderProductsObj[product._id] != null);
        setOrderProductsToShow(ordersProductsArr);
    };

    if (loading) {
        return <h1 className="text-center pt-4">Loading</h1>;
    }
    if (!orders.length) {
        return <h1 className="text-center pt-3">No orders yet</h1>;
    }
    return (
        <Container>
            <h1 className="text-center">Your orders</h1>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((orderObj) => (
                        <tr>
                            <td>{orderObj._id}</td>
                            <td> May 7 2022</td>
                            <td>
                                <Badge bg={`${orderObj.status === "processing" ? "warning" : "success"}`} text="white">
                                    {orderObj.status}
                                </Badge>
                            </td>
                            <td>${orderObj.total}</td>
                            <td className="text-center">
                                <span onClick={() => handleShow(orderObj)} style={{ cursor: "pointer" }}>
                                    View Order <i className="far fa-eye"></i>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Order</Modal.Title>
                </Modal.Header>
                {!orderProductsToShow ? (
                    <div className="text-center pt-4 pb-4" style={{ minHeight: 200 }}>
                        <Spinner animation="grow" />
                    </div>
                ) : (
                    <Modal.Body>
                        {orderProductsToShow.map((product) => (
                            <div className="order-product d-flex">
                                <img src={product.pictures[0].url} />
                                <div className="order-details-container">
                                    <h3>{product.name}</h3>
                                    <p></p>
                                </div>
                            </div>
                        ))}
                    </Modal.Body>
                )}
            </Modal>
        </Container>
    );
}

export default Orders;
