import axios from "../axios";
import React, { useContext, useEffect, useState } from "react";
import { Badge, Container, Table, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./Orders.css";
import { addNotification } from "../features/userSlice";
import Pagination from "../ components/Pagination";
import { AppContext } from "../AppContext";

function Orders() {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [orderToShow, setOrderToShow] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`/users/${user._id}/orders`).then(({ data }) => {
            setLoading(false);
            setOrders(data);
        });
    }, [refresh]);
    const { socket } = useContext(AppContext);

    const dispatch = useDispatch();

    socket.on("ordercreated", (msgObj) => {
        console.log("new order", msgObj);
        if (user.isAdmin) {
            alert("new order");
            console.log("new order", msgObj);
            dispatch(addNotification(msgObj));
        }
    });

    socket.off("notification").on("notification", (msgObj, user_id) => {
        if (user_id == user._id) {
            dispatch(addNotification(msgObj));
            setRefresh(!refresh);
        }
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    function showOrder(productsObj) {
        console.log("Show order called on product", productsObj);
        let productsToShow = products.filter((product) => productsObj[product._id]);
        productsToShow = productsToShow.map((product) => {
            const productCopy = { ...product };
            productCopy.count = productsObj[product._id];
            delete productCopy.description;
            return productCopy;
        });
        console.log(productsToShow);
        setShow(true);
        setOrderToShow(productsToShow);
    }

    function TableRow({ _id, status, total, time, products }) {
        return (
            <tr>
                <td>{_id}</td>
                <td> {time}</td>
                <td>
                    <Badge bg={`${status === "processing" ? "warning" : "success"}`} text="white">
                        {status}
                    </Badge>
                </td>
                <td>${total}</td>
                <td className="text-center">
                    <span onClick={() => showOrder(products)} style={{ cursor: "pointer" }}>
                        View Order <i className="far fa-eye"></i>
                    </span>
                </td>
            </tr>
        );
    }

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
                    <Pagination data={orders} RenderComponent={TableRow} pageLimit={Math.floor(orders.length / 10)} dataLimit={10} tablePagination={true} />
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {orderToShow.map((product) => (
                        <div className="order-details__container">
                            <img src={product.pictures[0].url} style={{ maxWidth: 100, height: 100, objectFit: "cover" }} />
                            <p>
                                <span>{product.count} x </span>
                                {product.name}
                            </p>
                            <p>Price: ${Number(product.price) * product.count}</p>
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Orders;
