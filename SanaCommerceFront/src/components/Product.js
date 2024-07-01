import React, { useState } from "react";
import PropTypes from "prop-types";
import ProductCatalog from "./ProductCatalog"
import { productPropType } from "./types/PropTypes";

const Product = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  return (
    <div className="container">
      <h2 className="product-title">{product.title}</h2>
      <p className="product-description">{product.description}</p>
      <div className="product-details">
        <span className="product-code"> Code: {product.code}</span>
        <span className="product-price"> Price: ${product.price}</span>
        <span className="product-stock"> Available Stock: {product.stock}</span>
      </div>
      <ProductCatalog
        product={product}
        quantity={quantity}
        onAddToCart={onAddToCart}
        handleChange={handleChange}
      />
    </div>
  );
};

Product.propTypes = {
  product: productPropType.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default Product;
