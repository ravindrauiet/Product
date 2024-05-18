import React, { useEffect, useState } from "react";
import { ProductsForm } from "./ProductsForm";

export function ProductsList(props) {
    const [products, setProducts] = useState([]);
    const [editedProduct, setEditedProduct] = useState(null);
    const [showButton, setShowButton] = useState(false);

    function fetchProduct() {
        fetch("./../../db.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("response.message");
                }
                return response.json();
            })
            .then((data) => {
                // Sort the products array by createdAt in descending order
                const sortedProducts = data.sort((a, b) => b.sl_no - a.sl_no);
                setProducts(sortedProducts);
            })
            .catch((error) => {
                console.log('Error:' + error.message);
            });
    }
    useEffect(() => fetchProduct(), []);

    function deleteProduct(id){
        fetch("./../../db.json/products/" + id, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data)=>fetchProduct());
           
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
                <ProductsForm product={editedProduct} updateProductList={fetchProduct} handleAdd={handleAdd} showButton={showButton} />
            ) : (
                < ProductsForm product={products} updateProductList={fetchProduct} />
            )}

            <h2 className="text-center mb-3 mt-3 ">List of Product</h2>
            <table className="table table-bordered table-hover">
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