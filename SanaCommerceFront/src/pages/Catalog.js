import React, { useState } from "react";
import Product from "../components/Product";

const initialProducts = [
  { id: 1, title: "Product 1", code: "P1001", description: "A great product", price: 100, stock: 10 },
  { id: 2, title: "Product 2", code: "P1002", description: "Another great product", price: 150, stock: 5 },
];

const Catalog = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleAddToCart = (productId, quantity) => {
    setProducts(products.map(product => {
      if (product.id === productId && product.stock >= quantity) {
        return { ...product, stock: product.stock - quantity };
      }
      return product;
    }));
  };

  return (
    <div>
      <h1 className="title">Catalog</h1>
      {products.map(product => (
        <Product key={product.id} product={product} onAddToCart={handleAddToCart} />
      ))}
    </div>
  );
};

export default Catalog;