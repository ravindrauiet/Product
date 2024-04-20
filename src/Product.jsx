import React, { useState } from 'react';

function Product() {
    const [formData, setFormData] = useState({
        sl_no: '',
        sales_purchase: '',
        date: '',
        party_name: '',
        details: '',
        weight: '',
        manpower: '',
        material: '',
        freight: '',
        maintainance: '',
        sales: '',
        payment_received: '',
        amount_paid: '',
        balance: ''
      });

      function handleSubmit(event) {
        event.preventDefault();
    
        // Form validation
        if (!formData.party_name) {
          return;
        }
    
        // Create new product
        formData.createdAt = new Date().toISOString().slice(0, 10);
    
        fetch("http://localhost:3000/products", {
          method: 'POST',
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData)
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response is not ok");
            }
            return response.json();
          })
          .then((data) => console.log(data))
          .catch((error) => console.error('Error:', error));
      }
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
      return (
        <div className="container mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-5">Fill The Form</h2>

          <form onSubmit={handleSubmit} style={{background:'green', color:'white'}}>
            <br/>
            <div style={{ padding:'5px' , margin:'10px'}}>
            {/* Input fields */}
            <div className="mb-3">
              <label className="block text-sm font-bold mb-1">Sl No. :- </label>
              <input
                className="form-input w-full"
                name="sl_no"
                value={formData.sl_no}
                onChange={handleChange}
              />
            </div>
    
            <div className="mb-3">
              <label className="block text-sm font-bold mb-1">Sales/Purchase :- </label>
              <input
                className="form-input w-full"
                name="sales_purchase"
                value={formData.sales_purchase}
                onChange={handleChange}
              />
            </div>
    
            <div className="mb-3">
              <label className="block text-sm font-bold mb-1">Date :- </label>
              <input
                className="form-input w-full"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
    
            <div className="mb-3">
              <label className="block text-sm font-bold mb-1">Party Name :- </label>
              <input
                className="form-input w-full"
                name="party_name"
                value={formData.party_name}
                onChange={handleChange}
              />
            </div>
    
            <div className="mb-3">
              <label className="block text-sm font-bold mb-1">Details :- </label>
              <input
                className="form-input w-full"
                name="details"
                value={formData.details}
                onChange={handleChange}
              />
            </div>
    
            <div className="mb-3">
              <label className="block text-sm font-bold mb-1">Weight :- </label>
              <input
                className="form-input w-full"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
    
            <div className="mb-3">
              <label className="block text-sm font-bold mb-1">Manpower :- </label>
              <input
                className="form-input w-full"
                name="manpower"
                value={formData.manpower}
                onChange={handleChange}
              />
            </div>
    
            <div className="mb-3">
              <label className="block text-sm font-bold mb-1">Material :- </label>
              <input
                className="form-input w-full"
                name="material"
                value={formData.material}
                onChange={handleChange}
              />
            </div>
    
            <div className="mb-3">
              <label className="block text-sm font-bold mb-1">Freight :- </label>
              <input
                className="form-input w-full"
                name="freight"
                value={formData.freight}
                onChange={handleChange}
              />
            </div>
    
            <div className="mb-3">
              <label className="block text-sm font-bold mb-1">Maintainance :- </label>
              <input
                className="form-input w-full"
                name="maintainance"
                value={formData.maintainance}
                onChange={handleChange}
              />
            </div>
    
            <div className="mb-3">
              <label className="block text-sm font-bold mb-1">Sales :- </label>
              <input
                className="form-input w-full"
                name="sales"
                value={formData.sales}
                onChange={handleChange}
              />
            </div>
    
            <div className="mb-3">
              <label className="block text-sm font-bold mb-1">Payment Received :- </label>
              <input
                className="form-input w-full"
                name="payment_received"
                value={formData.payment_received}
                onChange={handleChange}
              />
            </div>
    
            <div className="mb-3">
              <label className="block text-sm font-bold mb-1">Amount Paid :- </label>
              <input
                className="form-input w-full"
                name="amount_paid"
                value={formData.amount_paid}
                onChange={handleChange}
              />
            </div>
    
            <div className="mb-3">
              <label className="block text-sm font-bold mb-1">Balance :- </label>
              <input
                className="form-input w-full"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
              />
            </div>
    
            <div className="mt-5">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">Submit</button>
            </div>

            </div>
          </form>
        </div>
      );
}

export default Product
