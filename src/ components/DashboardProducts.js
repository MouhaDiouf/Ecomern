import React from "react";
import { Badge, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductsMutation } from "../services/appApi";
import { BootstrapTable, DeleteButton } from "react-bootstrap-table";
import { TableHeaderColumn } from "react-bootstrap-table";

function DashboardProducts() {
    const products = useSelector((state) => state.products);
    const [deleteProducts, { isLoading, isSuccess }] = useDeleteProductsMutation();

    function onDeleteRow(rows) {
        deleteProducts(rows);
    }

    const options = {
        onDeleteRow,
        paginationShowsTotal: true, // Enable showing total text
    };
    const selectRow = {
        mode: "checkbox",
    };
    return (
        <BootstrapTable data={products} options={options} selectRow={selectRow} striped={true} hover={true} pagination deleteRow>
            <TableHeaderColumn width="30%" dataField="_id" isKey={true} dataAlign="center" dataSort={true} searchable={true}>
                Product ID
            </TableHeaderColumn>
            <TableHeaderColumn width="30%" dataField="name" dataSort={true}>
                Product Name
            </TableHeaderColumn>
            <TableHeaderColumn width="30%" dataField="price">
                Product Price ($)
            </TableHeaderColumn>
        </BootstrapTable>
    );
}

export default DashboardProducts;
