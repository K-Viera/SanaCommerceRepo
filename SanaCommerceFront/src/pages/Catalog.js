import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
const fetchUrl = process.env.REACT_APP_FETCH_URL;

const initialProducts = [
  {
    id: 1,
    title: "Product 1",
    code: "P1001",
    description: "A great product",
    price: 100,
    stock: 10,
    quantity: 0,
  },
  {
    id: 2,
    title: "Product 2",
    code: "P1002",
    description: "Another great product",
    price: 150,
    stock: 5,
    quantity: 0,
  },
  {
    id: 3,
    title: "Product 3",
    code: "P1003",
    description: "Yet another great product",
    price: 200,
    stock: 3,
    quantity: 0,
  },
  {
    id: 4,
    title: "Product 4",
    code: "P1004",
    description: "The last great product",
    price: 250,
    stock: 7,
    quantity: 0,
  },
  {
    id: 5,
    title: "Product 5",
    code: "P1005",
    description: "The final great product",
    price: 300,
    stock: 2,
    quantity: 0,
  },
  {
    id: 6,
    title: "Product 6",
    code: "P1006",
    description: "The ultimate great product",
    price: 350,
    stock: 1,
    quantity: 0,
  },
];

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (productId, quantity) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId && product.stock >= quantity) {
          product.quantity = quantity;
          dispatch(addToCart(product));
        }
        return product;
      })
    );
  };

  useEffect(() => {
    const updatedProducts = initialProducts.map((initialProduct) => {
      const cartItem = cartItems.find((p) => p.id === initialProduct.id);
      if (cartItem) {
        return { ...initialProduct, quantity: cartItem.quantity };
      }
      return initialProduct;
    });
    setProducts(updatedProducts);
  }, [cartItems]);

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

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("Fetching products");
      const response = await fetch("https://localhost:7233/graphql/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers like authorization if needed
        },
        body: JSON.stringify({
          query: `
            {
              products {
                description
                price
                productCode
                productId
                productName
                stock
                categories {
                  categoryName
                }
              }
            }
          `,
        }),
      });

      const { data } = await response.json();
      if (data && data.products) {
        console.log(data.products);
        const products = data.products.map((product) => ({
          id: product.productId,
          title: product.productName,
          code: product.productCode,
          description: product.description,
          price: product.price,
          stock: product.stock,
          categories: product.categories,
          quantity: 0,
        }));
        setProducts(products);
      }
    };

    fetchProducts();
  }, []);

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
    </div>
  );
};

export default Catalog;
