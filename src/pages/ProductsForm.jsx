import React, { useState } from "react";
import Form from 'react-bootstrap/Form'

const saveFile = async (blob) => {
    const a = document.createElement('a');
    a.download = 'my-file.txt';
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };
  const obj = {hello: 'world'};
  const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
  
  saveFile(blob);
  
const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      console.log(text)
      alert(text)
    };
    reader.readAsText(e.target.files[0])
  }

export function ProductsForm(props) {
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        //read form data
        const formData = new FormData(event.target);
        console.log(formData)

        //convert form Data to object
        const product = Object.fromEntries(formData.entries());

        //Form validation
        if (!product.party_name) {
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    please provide all required fields!
                </div>
            )
            return;
        }

        if (props.product.id) {
            //call update method from props
            fetch("/db.json" + props.product.id, {
                method: 'PATCH',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(product)
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
                body: JSON.stringify(product)
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
            {/* <h2 className="text-center mb-3">{props.product.id ? "Edit Product" : "Create New Product"}</h2> */}
            <form onSubmit={(event) => handleSubmit(event)}>
            <Form.Group className="mb-3" controlId="product">
                {/* <Form.Label>Sl Number</Form.Label> */}
                <Form.Control className="d-flex" type="text" placeholder="SL Number" />

                <Form.Label>Sl Number</Form.Label>
                <Form.Control type="text" placeholder="SL Number" />
                <table className="table m-2 table-bordered table-hover">
                    <thead>
                    <tr className="">
                        <th>Sl_No</th>
                        <th>Sales_Purchase</th>
                        <th>Date</th>
                        <th>Party_Name</th>
                        <th>Details</th>
                        <th>Weight</th>
                        <th>manpower</th>
                        <th>Material</th>
                        <th>Freight</th>
                        <th>Maintainance</th>
                        <th>Sales</th>
                        <th>Payment_Received</th>
                        <th>Amount_paid</th>
                        <th>Balance</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <input className="form-control" id="sl_no" name="sl_no" defaultValue={props.product.sl_no} 
                                />
                            </td>
                            <td>
                                <input className="form-control" id="sales_purchase" name="sales_purchase" defaultValue={props.product.sales_purchase}  />
                            </td>
                            <td>
                                <input className="form-control" id="date" name="date" defaultValue={props.product.date} />
                            </td>
                            <td>
                                <input className="form-control" id="party_name" name="party_name" defaultValue={props.product.party_name} />
                            </td>
                            <td>
                                <input className="form-control" id="details" name="details" defaultValue={props.product.details} />
                            </td>
                            <td>
                                <input className="form-control" id="weight" name="weight" defaultValue={props.product.weight} />
                            </td>
                            <td>
                                <input className="form-control" id="manpower" name="manpower" defaultValue={props.product.manpower} />
                            </td>
                            <td>
                                <input className="form-control" id="material" name="material" defaultValue={props.product.material} />
                            </td>
                            <td>
                                <input className="form-control" id="freight" name="freight" defaultValue={props.product.freight} />
                            </td>
                            <td>
                                <input className="form-control" id="maintainance" name="maintainance" defaultValue={props.product.maintainance} />
                            </td>
                            <td>
                                <input className="form-control" id="sales" name="sales" defaultValue={props.product.sales} />
                            </td>
                            <td>
                                <input className="form-control" id="payment_received" name="payment_received" defaultValue={props.product.payment_received} />
                            </td>
                            <td>
                                <input className="form-control" id="amount_paid" name="amount_paid" defaultValue={props.product.amount_paid} />
                            </td>
                            <td>
                                <input className="form-control" id="balance" name="balance" defaultValue={props.product.balance} />
                            </td>
                            <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                <button type="submit" className="btn btn-success btn-sm me-2 ">Save</button>
                                {props.showButton && (
                                    <button onClick={() => props.handleAdd()} type="button" className="btn btn-primary btn-sm me-2"> New</button>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form.Group>
            </form>
        </>
    )
}
