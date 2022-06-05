import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import Loading from "./Loading";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";

function DashboardOrders() {
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(false);
    const products = useSelector((state) => state.products);
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function showOrder(productsObj) {
        let productsToShow = products.filter((product) => productsObj[product._id]);
        productsToShow = productsToShow.map((product) => {
            const productCopy = { ...product };
            productCopy.count = productsObj[product._id];
            delete productCopy.description;
            return productCopy;
        });
        setShow(true);
        setOrderToShow(productsToShow);
    }

    function TableRow({ _id, count, owner, total, status, products, address }) {
        return (
            <tr>
                <td>{_id}</td>
                <td>{owner?.name}</td>
                <td>{count}</td>
                <td>{total}</td>
                <td>{address}</td>
                <td>
                    {status === "processing" ? (
                        <Button size="sm" onClick={() => markShipped(_id, owner?._id)}>
                            Mark as shipped
                        </Button>
                    ) : (
                        <Badge bg="success">Shipped</Badge>
                    )}
                </td>
                <td>
                    <span style={{ cursor: "pointer" }} onClick={() => showOrder(products)}>
                        View order <i className="fa fa-eye"></i>
                    </span>
                </td>
            </tr>
        );
    }

    function markShipped(id, ownerId) {
        axios
            .patch(`/orders/${id}/mark-shipped`, {
                ownerId,
            })
            .then(({ data }) => setOrders(data))
            .catch((e) => console.log(e));
    }
    useEffect(() => {
        setLoading(true);
        axios
            .get("/orders")
            .then(({ data }) => {
                setLoading(false);
                console.log("orders", data);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, []);
    if (loading) {
        return <Loading />;
    }
    if (!orders?.length) {
        return <h2 className="text-center pt-4">No orders yet</h2>;
    }

    return (
        <>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Client Name</th>
                        <th>Items</th>
                        <th>Order Total</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    <Pagination data={orders} RenderComponent={TableRow} pageLimit={1} dataLimit={10} tablePagination={true} />
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order details</Modal.Title>
                </Modal.Header>
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
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DashboardOrders;
