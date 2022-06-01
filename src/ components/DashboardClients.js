import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "../axios";
import { useDeleteUsersMutation } from "../services/appApi";
import Loading from "./Loading";
import Pagination from "./Pagination";
function DashboardClients() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleteUser, { isSuccess }] = useDeleteUsersMutation();
    function handleDeleteUser(id) {
        if (window.confirm("Are you sure?")) deleteUser(id).then(({ data }) => setUsers(data));
    }

    function TableRow({ _id, name, email }) {
        return (
            <tr>
                <td>{_id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>
                    <Button onClick={() => handleDeleteUser(_id)} variant="danger">
                        Delete
                    </Button>
                </td>
            </tr>
        );
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
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Client ID</th>
                    <th>Client Name</th>
                    <th> Email</th>
                </tr>
            </thead>
            <tbody>
                <Pagination data={users} RenderComponent={TableRow} pageLimit={Math.floor(users.length / 5)} dataLimit={5} tablePagination={true} />
            </tbody>
        </Table>
    );
}

export default DashboardClients;
