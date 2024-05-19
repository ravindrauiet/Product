import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import { open, close } from 'node:fs';

const fs = require('fs');


export function ProductsForm(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [validated, setValidated] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        // console.log(form);
        
        // Read form data
        const formData = new FormData(form);
        // console.log(formData);
        
        // Convert formData to object
        const product = Object.fromEntries(formData.entries());
        console.log(product);
        // Add createdAt field for new products
        if (!props.product.id) {
            product.createdAt = new Date().toISOString().slice(0, 10);
        }


        // Set validation state
        setValidated(true);

        if (props.product.id) {
            //call update method from props
            fetch("/db.json" + props.product.id, {
                method: 'PATCH',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(product),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response is not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    // After successful update, trigger the function to update the product list
                    props.updateProductList();
                })
                .catch((error) => console.error('Error:', error));
        }
        else {

            // Create new product
            formData.createdAt = new Date().toISOString().slice(0, 10);
            fetch("/db.json", {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                // body: JSON.stringify(product)
                fs.writeFileSync('data.json', JSON.stringify(product));
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response is not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    // After successful creation, trigger the function to update the product list
                    props.updateProductList();
                })
                .catch((error) => console.error('Error:', error));
        }
     }

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-1">
                    <Form.Group as={Col} sm="1" controlId="validationCustom01">
                        <Form.Label>Sl_No</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="sl_no"
                            placeholder="Sl_No"
                            defaultValue=""
                        />
                    </Form.Group>
                    <Form.Group as={Col} sm="1" controlId="validationCustom02">
                        <Form.Label>Sales_Purchase</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="sales_purchase"
                            placeholder="Sales"
                            defaultValue=""
                        />
                    </Form.Group>
                
                    <Form.Group as={Col} sm="1" controlId="validationCustom03">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="text" name="date" placeholder="Date" defaultValue="" />
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="validationCustom04">
                        <Form.Label>Details</Form.Label>
                        <Form.Control type="text" name="details" placeholder="Details" defaultValue=""/>  
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="validationCustom05">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control type="text" name="weight" placeholder="Weight" defaultValue="" />
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="validationCustom05">
                        <Form.Label>Manpower</Form.Label>
                        <Form.Control type="text" name="manpower" placeholder="Manpower" defaultValue=""/>
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="validationCustom05">
                        <Form.Label>Material</Form.Label>
                        <Form.Control type="text" name="material" placeholder="Material" defaultValue=""/>
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="validationCustom05">
                        <Form.Label>Freight</Form.Label>
                        <Form.Control type="text" name="freight" placeholder="Freight" defaultValue=""/>
                    </Form.Group>
                    <Form.Group as={Col} md="1" controlId="validationCustom05">
                        <Form.Label>Maintainance</Form.Label>
                        <Form.Control type="text" name="maintainance" placeholder="Maintainance" defaultValue=""/>
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="validationCustom05">
                        <Form.Label>Sales</Form.Label>
                        <Form.Control type="text" name="sales" placeholder="Sales" defaultValue=""/>
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="validationCustom05">
                        <Form.Label>Payment_Received</Form.Label>
                        <Form.Control type="payment_received" name="Payment_Received" placeholder="Payment_Received" defaultValue=""/>
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="validationCustom05">
                        <Form.Label>Amount_Paid</Form.Label>
                        <Form.Control type="text" name="amount_paid" placeholder="Amount_Paid" defaultValue=""/>
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="validationCustom05">
                        <Form.Label>Balance</Form.Label>
                        <Form.Control type="text" name="balance" placeholder="Balance" defaultValue=""/>
                    </Form.Group>

                    {/* <Form.Group as={Col} md="1" controlId="validationCustom05">
                        <Form.Label>Action</Form.Label>  
                    </Form.Group> */}

                    <Button type="submit" className="btn btn-success btn-sm me-2 mt-3 ">Save</Button>
                    {props.showButton && (
                            <button onClick={() => props.handleAdd()} type="button" className="btn btn-primary btn-sm me-2"> New</button>
                    )}
                </Row>
                
            </Form>
        </>
    );
}

    
    