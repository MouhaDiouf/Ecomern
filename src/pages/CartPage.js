import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import productImage from "../images/apple-watch__third--slide.png";
//https://support.undsgn.com/hc/article_attachments/360009979057/doc-cc-intro-min.jpg
function CartPage() {
    return (
        <Container>
            <Row>
                <Col md={6}>
                    <h1>Shopping cart</h1>
                    <Table responsive="sm">
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
                            <tr>
                                <td>&nbsp;</td>
                                <td>
                                    x <img src={productImage} style={{ width: 200, height: 250, objectFit: "cover" }} />
                                </td>
                                <td>$476</td>
                                <td>
                                    <input type="text" value="1" />
                                </td>
                                <td>$476</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col md={6}>
                    <h2>Cart totals</h2>
                    <h3>Shipping</h3>
                    <h3>Total</h3>
                    <Button className="btn-lg btn-secondary">Proceed to checkout</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default CartPage;
