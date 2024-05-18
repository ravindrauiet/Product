import React, { useState } from "react";

export function ProductsForm(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [salesPurchaseSize, setSalesPurchaseSize] = useState("form-control");
    const [dateSize, setDateSize] = useState("form-control");
    const [partyNameSize, setPartyNameSize] = useState("form-control");

    function handleFocus(field) {
        switch (field) {
            case "sales_purchase":
                setSalesPurchaseSize("form-control-lg");
                break;
            case "date":
                setDateSize("form-control-lg");
                break;
            case "party_name":
                setPartyNameSize("form-control-lg");
                break;
            default:
                break;
        }
    }

    function handleBlur(field) {
        switch (field) {
            case "sl_no":
                setSlNoSize("form-control");
                break;
            case "sales_purchase":
                setSalesPurchaseSize("form-control");
                break;
            case "date":
                setDateSize("form-control");
                break;
            case "party_name":
                setPartyNameSize("form-control");
                break;
            default:
                break;
        }
    }

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
            fetch("./../../db.json/products/" + props.product.id, {
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
            fetch("./../../db.json/products", {
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
                <table className="table m-2 table-bordered table-hover">
                    <thead>
                        <tr className="">
                            <th>sl_no</th>
                            <th>sales_purchase</th>
                            <th>date</th>
                            <th>party_name</th>
                            <th>details</th>
                            <th>weight</th>
                            <th>manpower</th>
                            <th>material</th>
                            <th>freight</th>
                            <th>maintainance</th>
                            <th>Sales</th>
                            <th>payment_received</th>
                            <th>amount_paid</th>
                            <th>balance</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <input className="form-control" name="sl_no" defaultValue={props.product.sl_no} onFocus={() => handleFocus("sl_no")} onBlur={() => handleBlur("sl_no")} />
                            </td>
                            <td>
                                <input className="form-control" name="sales_purchase" defaultValue={props.product.sales_purchase} onFocus={() => handleFocus("sales_purchase")} onBlur={() => handleBlur("sales_purchase")} />
                            </td>
                            <td>
                                <input className={dateSize} name="date" defaultValue={props.product.date} onFocus={() => handleFocus("date")} onBlur={() => handleBlur("date")} />
                            </td>
                            <td>
                                <input className={partyNameSize} name="party_name" defaultValue={props.product.party_name} onFocus={() => handleFocus("party_name")} onBlur={() => handleBlur("party_name")} />
                            </td>
                            <td>
                                <input className="form-control" name="details" defaultValue={props.product.details} />
                            </td>
                            <td>
                                <input className="form-control" name="weight" defaultValue={props.product.weight} />
                            </td>
                            <td>
                                <input className="form-control" name="manpower" defaultValue={props.product.manpower} />
                            </td>
                            <td>
                                <input className="form-control" name="material" defaultValue={props.product.material} />
                            </td>
                            <td>
                                <input className="form-control" name="freight" defaultValue={props.product.freight} />
                            </td>
                            <td>
                                <input className="form-control" name="maintainance" defaultValue={props.product.maintainance} />
                            </td>
                            <td>
                                <input className="form-control" name="sales" defaultValue={props.product.sales} />
                            </td>
                            <td>
                                <input className="form-control" name="payment_received" defaultValue={props.product.payment_received} />
                            </td>
                            <td>
                                <input className="form-control" name="amount_paid" defaultValue={props.product.amount_paid} />
                            </td>
                            <td>
                                <input className="form-control" name="balance" defaultValue={props.product.balance} />
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
            </form>
        </>
    )
}
