import React from "react";
import useSubmitOrder from "../components/SubmitOrder";


const CartSummary = ({ cartItems, totalPay }) => {

  const submitOrder = useSubmitOrder();

  const handleProcessOrder = () => {
    submitOrder();
  }

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
      <button className="process-btn" onClick={handleProcessOrder} > Process Order</button>
    </>
  );
};

export default CartSummary;
