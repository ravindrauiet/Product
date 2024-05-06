import React, { useEffect, useState } from "react";

export function ProductsForm(props) {
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        //read form data
        const formData = new FormData(event.target);

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
            fetch("http://localhost:3000/products/" + props.product.id, {
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
                .then((data) => props.showList())
                .catch((error) => console.error('Error:', error));
        }
         else {
        // Create new product
        formData.createdAt = new Date().toISOString().slice(0, 10);

        fetch("http://localhost:3000/products", {
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
            .then((data) => props.showList())
            .catch((error) => console.error('Error:', error));
    }
}
return (
    <>
        <h2 className="text-center mb-3">{props.product.id ? "Edit Product": "Create New Product"} </h2>

        <div className="row">
            <div className="col-lg-6 mx-auto">

                {errorMessage}
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Sl No. :-</label>
                        <div className="col-sm-8">
                            <input className="form-control "
                                name="sl_no"
                                defaultValue={props.product.sl_no} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Sales/Purchase :-</label>
                        <div className="col-sm-8">
                            <input className="form-control "
                                name="sales_purchase"
                                defaultValue={props.product.sales_purchase} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Date :-</label>
                        <div className="col-sm-8">
                            <input className="form-control "
                                name="date"
                                defaultValue={props.product.date} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Party Name :-</label>
                        <div className="col-sm-8">
                            <input className="form-control "
                                name="party_name"
                                defaultValue={props.product.party_name} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Details :-</label>
                        <div className="col-sm-8">
                            <input className="form-control "
                                name="details"
                                defaultValue={props.product.details} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Weight :-</label>
                        <div className="col-sm-8">
                            <input className="form-control "
                                name="weight"
                                defaultValue={props.product.weight} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Manpower :-</label>
                        <div className="col-sm-8">
                            <input className="form-control "
                                name="manpower"
                                defaultValue={props.product.manpower} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Material :-</label>
                        <div className="col-sm-8">
                            <input className="form-control "
                                name="material"
                                defaultValue={props.product.material} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Freight :-</label>
                        <div className="col-sm-8">
                            <input className="form-control "
                                name="freight"
                                defaultValue={props.product.freight} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Maintainance :-</label>
                        <div className="col-sm-8">
                            <input className="form-control "
                                name="maintainance"
                                defaultValue={props.product.maintainance} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Sales :-</label>
                        <div className="col-sm-8">
                            <input className="form-control "
                                name="sales"
                                defaultValue={props.product.sales} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Payment Received :-</label>
                        <div className="col-sm-8">
                            <input className="form-control "
                                name="payment_received"
                                defaultValue={props.product.payment_received} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Amount Paid :-</label>
                        <div className="col-sm-8">
                            <input className="form-control "
                                name="amount_paid"
                                defaultValue={props.product.amount_paid} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Balance :-</label>
                        <div className="col-sm-8">
                            <input className="form-control "
                                name="balance"
                                defaultValue={props.product.balance} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="offset-sm-4 col-sm-4 d-grid">
                            <button type="submit" className="btn btn-primary btn-sm me-3">Save</button>
                        </div>
                        <div className="col-sm-4  d-grid">
                            <button onClick={() => props.showList()} type="button" className="btn btn-secondary me-2">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
)
}