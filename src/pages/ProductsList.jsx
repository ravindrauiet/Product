import React, { useEffect, useState } from "react";
import { ProductsForm } from "./ProductsForm";

export function ProductsList(props) {
    const [products, setProducts] = useState([]);
    const [editedProduct, setEditedProduct] = useState(null);
    const [showButton, setShowButton] = useState(false);

    function fetchProduct() {
        fetch("/db.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("response.message");
                }
                return response.json();
            })
            .then((data) => {
                // Sort the products array by createdAt in descending order
                const sortedProducts = data.products.sort((a, b) => b.sl_no - a.sl_no);
                setProducts(sortedProducts);
            })
            .catch((error) => {
                console.log('Error:' + error.message);
            });
    }
    useEffect(() => fetchProduct(), []);

    function deleteProduct(id) {
        fetch(`/db.json/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // If the response has a body, parse it as JSON, otherwise return an empty object or appropriate value
            return response.text().then(text => text ? JSON.parse(text) : {});
        })
        .then((data) => fetchProduct())
        .catch((error) => console.error('Error:', error));
    }

   

    function handleEdit(product) {
        setEditedProduct(product);
        setShowButton(true); 
    }

    function handleAdd() {
        setEditedProduct(null);
        setShowButton(false);  // Reset editedProduct to null to show the form for adding a new product
    }

    return (
        <>
           
            {/* <button onClick={() => props.showForm({})} type="button" className="btn btn-primary me-2">Create</button> */}
            <button onClick={() => window.location.reload()} type="button" className="btn btn-outline-primary me-2">Refresh</button>
    
            {/* Conditional rendering of ProductsForm */}
            {editedProduct !== null ? (
                <ProductsForm products={products} product={editedProduct} updateProductList={fetchProduct} handleAdd={handleAdd} showButton={showButton} />
            ) : (
                < ProductsForm products={products} product={products} updateProductList={fetchProduct} />
            )}

            <h2 className="text-center mb-3 mt-3 ">List of Product</h2>
            <table className="table table-bordered table-hover">
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
                                        <button onClick={() => handleEdit(product)} className="btn btn-primary btn-sm me-2 ">Edit</button>
                                        
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