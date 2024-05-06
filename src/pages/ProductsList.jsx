import React, { useEffect, useState } from "react";

export function ProductsList(props) {
    const [products, setProducts] = useState([]);

    function fetchProduct() {
        fetch("http://localhost:3000/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("response.message");
                }
                return response.json();
            })
            .then((data) => {
                //console.log(data);
                setProducts(data);
            }).catch((error) => {
                console.log('Error:' + error.message);
            });
    }
    useEffect(() => fetchProduct(), []);

    function deleteProduct(id){
        fetch("http://localhost:3000/products/" + id, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data)=>fetchProduct());
           
    }
    return (
        <>
            <h2 className="text-center mb-3">List of Product</h2>
            <button onClick={() => props.showForm({})} type="button" className="btn btn-primary me-2">Create</button>
            <button onClick={() => fetchProduct()} type="button" className="btn btn-outline-primary me-2">Refresh</button>

            <table className="table">
                <thead>
                    <tr>
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
                    {
                        products.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.sl_no}</td>
                                    <td>{product.sales_purchase}</td>
                                    <td>{product.date}</td>
                                    <td>{product.party_name}</td>
                                    <td>{product.details}</td>
                                    <td>{product.weight}</td>
                                    <td>{product.manpower}</td>
                                    <td>{product.material}</td>
                                    <td>{product.freight}</td>
                                    <td>{product.maintainance}</td>
                                    <td>{product.sales}</td>
                                    <td>{product.payment_received}</td>
                                    <td>{product.amount_paid}</td>
                                    <td>{product.balance}</td>
                                    <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                        <button onClick={() => props.showForm(product)} className="btn btn-primary btn-sm me-2">Edit</button>
                                        <button onClick={() => deleteProduct(product.id)} className="btn btn-danger btn-sm me-2">Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    );
}