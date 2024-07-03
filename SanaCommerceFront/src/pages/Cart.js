import React, {useEffect} from "react";
import Product from "../components/Product";
import CartSummary from "../components/CartSummary";
import { useSelector, useDispatch } from "react-redux";
import { modifyQuantityCart, modifyStockCart } from "../redux/CartSlice";
import { generateProductQuery } from "../utils/fetchBody";

const fetchUrl = process.env.REACT_APP_FETCH_URL;
const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalPay = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const fetchProductStock = async (productId) => {
    const response = await fetch(process.env.REACT_APP_FETCH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: generateProductQuery(productId),
    });
    const data = await response.json();
    return data.data.product;
  }

  useEffect(() => {
    cartItems.forEach((item) => {
      fetchProductStock(item.id).then((product) => {

        if(product.stock !== item.stock){
          let newProduct = { ...item, stock: product.stock };
          console.log("new",newProduct)
          dispatch(modifyStockCart(newProduct));
        }
        if (product.stock < item.quantity) {
          let newProduct = { ...item, quantity: product.stock };
          dispatch(modifyQuantityCart(newProduct));
        }
      });
    });
  }, []); 

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
