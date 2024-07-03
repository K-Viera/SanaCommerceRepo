import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import {
  setEndCursor,
  setPreviousCursor,
  setCurrentCursor,
} from "../redux/paginationSlice";
import { initialProducts, generateFetchBody } from "../utils/fetchBody";
import { current } from "@reduxjs/toolkit";
const fetchUrl = process.env.REACT_APP_FETCH_URL;

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const endCursor = useSelector((state) => state.pagination.endCursor);
  const previousCursor = useSelector(
    (state) => state.pagination.previousCursor
  );
  const currentCursor = useSelector((state) => state.pagination.currentCursor);

  const handleAddToCart = (productId, quantity) => {
    products.map((product) => {
      if (product.id === productId && product.stock >= quantity) {
        product.quantity = quantity;
        dispatch(addToCart(product));
      }
    });
  };
  

  const populateQuantity=(newProducts)=>{
    const updatedProducts = newProducts.map((product) => {
      const cartItem = cartItems.find((p) => p.id === product.id);
      if (cartItem) {
        return { ...product, quantity: cartItem.quantity };
      }
      return product;
    });

    setProducts(updatedProducts);
  }


  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 0) {
      quantity = 0;
    }

    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          if (quantity > product.stock) {
            quantity = product.stock;
          }
          return { ...product, quantity: quantity };
        }
        return product;
      })
    );
  };

  const fetchProducts = async (after, cursor) => {
    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers like authorization if needed
      },
      body: generateFetchBody(after, cursor),
    });

    console.log("body", generateFetchBody(after, cursor));

    const { data } = await response.json();
    if (data && data.products && data.products.edges) {
      const products = data.products.edges.map((edge) => ({
        id: edge.node.productId,
        title: edge.node.productName,
        code: edge.node.productCode,
        description: edge.node.description,
        price: edge.node.price,
        stock: edge.node.stock,
        categories: edge.node.categories,
        quantity: 0,
      }));
      populateQuantity(products);
      dispatch(setEndCursor(data.products.pageInfo.endCursor));
      dispatch(setPreviousCursor(data.products.pageInfo.startCursor));
      
    }
  };

  useEffect(() => {
    fetchProducts(true, null);
  }, []);

  const handleNextPage = () => {
    // console.log("endCursor",endCursor);
    fetchProducts(true, endCursor);
  };

  const handlePreviousPage = () => {
    // console.log("previousCursor",previousCursor);
    fetchProducts(false, previousCursor);
  };

  return (
    <div>
      <h1 className="title">Catalog</h1>
      <div className="products-grid">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            text="Add to Cart"
            handleQuantityChange={(quantity) =>
              handleQuantityChange(product.id, quantity)
            }
          />
        ))}
      </div>
      <div className="buttons-container">
        <button className="page-btn" onClick={handlePreviousPage}>
          Previous
        </button>
        <button className="page-btn" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Catalog;
