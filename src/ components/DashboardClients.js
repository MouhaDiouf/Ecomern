import React, { useState, useEffect } from "react";
import { Table, Spinner, Modal } from "react-bootstrap";
import { TableHeaderColumn } from "react-bootstrap-table";
import { BootstrapTable } from "react-bootstrap-table";
import axios from "../axios";
import { useDeleteUsersMutation } from "../services/appApi";
import Loading from "./Loading";
function DashboardClients() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [deleteUser, { isLoading, isSuccess }] = useDeleteUsersMutation();
    function handleDeleteUser(id) {
        if (window.confirm("Are you sure?")) deleteUser(id).then(({ data }) => setUsers(data));
    }

    useEffect(() => {
        setLoading(true);
        axios
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUsers(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, [isSuccess]);
    if (loading) {
        return <Loading />;
    }
    if (!users?.length) {
        return <h2 className="pt-2 pb-2">No users yet</h2>;
    }
    function onDeleteRow(rows) {
        deleteUser(rows);
    }
    const options = {
        onDeleteRow,
        paginationShowsTotal: true, // Enable showing total text
    };
    const selectRow = {
        mode: "checkbox",
    };
    return (
        <>
            <BootstrapTable data={users} options={options} selectRow={selectRow} striped={true} hover={true} pagination deleteRow version="4">
                <TableHeaderColumn width="30%" dataField="_id" isKey={true} dataAlign="center" dataSort={true} searchable={true}>
                    User ID
                </TableHeaderColumn>
                <TableHeaderColumn width="35%" dataField="name" dataSort={true}>
                    Name
                </TableHeaderColumn>
                <TableHeaderColumn width="35%" dataField="email">
                    Email
                </TableHeaderColumn>
            </BootstrapTable>
        </>
    );
}

export default DashboardClients;
