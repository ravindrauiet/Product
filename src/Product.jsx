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
    
        fetch("./../../db.json/products", {
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
        <div style={{ margin: 'auto', marginTop: '10px', width: '100%' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Fill The Form</h2>

          <form onSubmit={handleSubmit} style={{ backgroundColor: 'lightgreen', color: 'black', padding: '20px', borderRadius: '5px' }}>
            <br/>
            <div style={{ padding:'5px' , margin:'10px'}}>
            {/* Input fields */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Sl No. :- </label>
              <input
                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                name="sl_no"
                value={formData.sl_no}
                onChange={handleChange}
              />
            </div>
    
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Sales/Purchase :- </label>
              <input
                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                name="sales_purchase"
                value={formData.sales_purchase}
                onChange={handleChange}
              />
            </div>
    
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Date :- </label>
              <input
                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
    
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Party Name :- </label>
              <input
                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                name="party_name"
                value={formData.party_name}
                onChange={handleChange}
              />
            </div>
    
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Details :- </label>
              <input
                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                name="details"
                value={formData.details}
                onChange={handleChange}
              />
            </div>
    
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Weight :- </label>
              <input
                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
    
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Manpower :- </label>
              <input
                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                name="manpower"
                value={formData.manpower}
                onChange={handleChange}
              />
            </div>
    
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Material :- </label>
              <input
                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                name="material"
                value={formData.material}
                onChange={handleChange}
              />
            </div>
    
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Freight :- </label>
              <input
                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                name="freight"
                value={formData.freight}
                onChange={handleChange}
              />
            </div>
    
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Maintainance :- </label>
              <input
                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                name="maintainance"
                value={formData.maintainance}
                onChange={handleChange}
              />
            </div>
    
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Sales :- </label>
              <input
                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                name="sales"
                value={formData.sales}
                onChange={handleChange}
              />
            </div>
    
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Payment Received :- </label>
              <input
                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                name="payment_received"
                value={formData.payment_received}
                onChange={handleChange}
              />
            </div>
    
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Amount Paid :- </label>
              <input
                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                name="amount_paid"
                value={formData.amount_paid}
                onChange={handleChange}
              />
            </div>
    
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Balance :- </label>
              <input
                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                name="balance"
                value={formData.balance}
                onChange={handleChange}
              />
            </div>
    
            <div style={{ marginTop: '1rem' }}>
              <button style={{ backgroundColor: 'blue', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }} type="submit">Submit</button>
            </div>

            </div>
          </form>
        </div>
      );
}

export default Product;
