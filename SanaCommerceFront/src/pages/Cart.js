import React, { useState } from "react";
import Product from "../components/Product";
import CartSummary from "../components/CartSummary";

const initialCartItems = [
  { id: 1, title: "Product 1", code: "P1001", description: "A great product", price: 100, stock: 10, quantity: 2 },
  { id: 2, title: "Product 2", code: "P1002", description: "Another great product", price: 150, stock: 5, quantity: 1 },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const totalPay = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="flex-container">
      <div className="products-in-cart">
        <h2 className="title">Items in Cart</h2>
        {cartItems.map(item => (
          <Product key={item.id} product={item} />
        ))}
      </div>
      <div className="Cart-Summary">
        <CartSummary cartItems={cartItems} totalPay={totalPay} />
      </div>
    </div>
  );
};

export default Cart;