import React from "react";

const CartSummary = ({ cartItems, totalPay }) => {
  return (
    <>
      <h2 className="title">Cart Summary</h2>
      <ul className="list-container">
        {cartItems.map((item) => (
          <li key={item.id} className="item">
            <span className="summary-title">{item.title}</span>
            <span className="summary-quantity">Quantity: {item.quantity}</span>
            <span className="summary-total">
              Total: ${item.quantity * item.price}
            </span>
          </li>
        ))}
      </ul>
      <p className="total">Cart Total: ${totalPay}</p>
      <button className="process-btn "> Process Order</button>
    </>
  );
};

export default CartSummary;
