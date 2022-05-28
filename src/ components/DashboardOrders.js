import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import socketConnection from "../socketConnection";
import { BootstrapTable } from "react-bootstrap-table";
import { TableHeaderColumn } from "react-bootstrap-table";
import { useDeleteProductsMutation } from "../services/appApi";

function DashboardOrders() {
    const products = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (order) => {
        setOrderToShow(order);
        setShow(true);
    };
    const [orderToShow, setOrderToShow] = useState(null);
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleteMany] = useDeleteProductsMutation();

    function markShipped(id, ownerId) {
        axios
            .patch(`/orders/${id}/mark-shipped`, {
                socketId: socketConnection.id,
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
    function onDeleteRow(rows) {
        deleteMany(rows);
    }
    const options = {
        onDeleteRow,
        paginationShowsTotal: true, // Enable showing total text
        onRowClick: function (row) {
            alert(row);
            console.log(row);
        },
    };
    const selectRow = {
        mode: "checkbox",
    };
    return (
        <BootstrapTable data={orders} options={options} selectRow={selectRow} striped={true} hover={true} pagination deleteRow version="4">
            <TableHeaderColumn width="30%" dataField="_id" isKey={true} dataAlign="center" dataSort={true} searchable={true}>
                Order ID
            </TableHeaderColumn>
            <TableHeaderColumn width="35%" dataField="owner.name" dataSort={true}>
                Client
            </TableHeaderColumn>
            <TableHeaderColumn width="35%" dataField="total">
                Total($)
            </TableHeaderColumn>
        </BootstrapTable>
    );
}

export default DashboardOrders;
