import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import {
  setEndCursor,
  setPreviousCursor,
} from "../redux/paginationSlice";
import { initialProducts, generateFetchBody } from "../utils/fetchBody";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const fetchUrl = process.env.REACT_APP_FETCH_URL;
const MySwal = withReactContent(Swal);

const Catalog = () => {
  const [isLoading, setIsLoading] = useState(true);
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
        showAlertAddingProducts(quantity);
      }
    });
  };
  
  const showAlertAddingProducts= (quantity) => {
    MySwal.fire({
      title:'Success!',
      text: `${quantity} products added to the cart`,
      icon: 'ok',
      confirmButtonText: 'OK'
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
    setIsLoading(true);
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
      setIsLoading(false);
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
    fetchProducts(false, previousCursor);
  };

  return (
    <div>
        {isLoading ? (
      <div className="loading-container">Loading...</div>
    ) : (
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
    )}

    </div>
  );
};

export default Catalog;
