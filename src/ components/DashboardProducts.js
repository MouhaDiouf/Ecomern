import React from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDeleteProductMutation } from "../services/appApi";
import Pagination from "./Pagination";

function DashboardProducts() {
    const products = useSelector((state) => state.products);
    const [deleteProduct] = useDeleteProductMutation();
    function TableRow({ _id, name, price, pictures }) {
        return (
            <tr>
                <td>
                    <img src={pictures[0].url} className="dashboard-product-preview" />
                </td>
                <td>{_id}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>
                    <Button onClick={() => deleteProduct(_id)} variant="danger">
                        Delete
                    </Button>
                    <Button onClick={() => deleteProduct(_id)} variant="warning">
                        Edit
                    </Button>
                </td>
            </tr>
        );
    }
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th></th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th> Product Price</th>
                </tr>
            </thead>
            <tbody>
                <Pagination data={products} RenderComponent={TableRow} pageLimit={Math.floor(products.length / 10)} dataLimit={10} tablePagination={true} />
            </tbody>
        </Table>
    );
}

export default DashboardProducts;
