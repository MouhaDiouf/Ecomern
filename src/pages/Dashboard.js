import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row, Table, Tab, Nav, Container } from "react-bootstrap";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import DashboardProducts from "../ components/DashboardProducts";
import DashboardOrders from "../ components/DashboardOrders";
import DashboardClients from "../ components/DashboardClients";
function Dashboard() {
    useEffect(() => {
        axios.get("/products").then((res) => console.log(res));
    });
    return (
        <Container>
            <Tab.Container id="left-tabs-example" defaultActiveKey="products">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="products">Products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="orders">Orders</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="clients">Clients</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="products">
                                <DashboardProducts />
                            </Tab.Pane>
                            <Tab.Pane eventKey="orders">
                                <DashboardOrders />
                            </Tab.Pane>
                        </Tab.Content>
                        <Tab.Pane eventKey="clients">
                            <DashboardClients />
                        </Tab.Pane>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}

export default Dashboard;
