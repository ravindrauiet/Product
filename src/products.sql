-- Get method

SELECT (sl_no_value, sales_purchase_value, date_value, party_name_value, details_value, weight_value, manpower_value, material_value, freight_value, maintainance_value, sales_value, payment_received_value, amount_paid_value, balance_value) FROM products;


-- Post method (insert)

INSERT INTO products (sl_no, sales_purchase, date, party_name, details, weight, manpower, material, freight, maintainance, sales, payment_received, amount_paid, balance)
VALUES ('sl_no_value', 'sales_purchase_value', 'date_value', 'party_name_value', 'details_value', 'weight_value', 'manpower_value', 'material_value', 'freight_value', 'maintainance_value', 'sales_value', 'payment_received_value', 'amount_paid_value', 'balance_value');

-- Update method

UPDATE products
SET amount_paid = 'new_amount_paid_value',
    balance = 'new_balance_value'
WHERE sl_no = 'sl_no_value';