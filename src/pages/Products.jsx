import React, { useEffect, useState } from "react";
import { ProductsList } from "./ProductsList";
import { ProductsForm } from "./ProductsForm";


export function Products() {
    const [content, setContent] = useState(<ProductsList showForm={showForm} />)

    function showList() {
        setContent(<ProductsList showForm={showForm} />);
    }

    function showForm(product) {
        setContent(<ProductsForm product={product} showList={showList} />);
    }
    return (
        <div className="container my-5">
            {content}
        </div>
    );
}
