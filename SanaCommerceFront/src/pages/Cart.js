import React from "react";
import Product from "../components/Product";
import CartSummary from "../components/CartSummary";
import { useSelector, useDispatch } from "react-redux";
import { modifyQuantityCart } from "../redux/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalPay = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (productId, quantity) => {
    const existingProduct = cartItems.find((item) => item.id === productId);
    if (existingProduct) {
      let newProduct = { ...existingProduct, quantity: quantity };
      dispatch(modifyQuantityCart(newProduct));
    }
  };

  return (
    <div className="flex-container">
      <div className="products-in-cart">
        <h2 className="title">Items in Cart</h2>
        {cartItems.map((item) => (
          <Product
            key={item.id}
            product={item}
            handleQuantityChange={(quantity) =>
              handleQuantityChange(item.id, quantity)
            }
          />
        ))}
      </div>
      <div className="Cart-Summary">
        <CartSummary cartItems={cartItems} totalPay={totalPay} />
      </div>
    </div>
  );
};

export default Cart;
