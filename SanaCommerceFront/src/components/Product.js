import React, { useState } from "react";
import PropTypes from "prop-types";
import ProductCatalog from "./ProductCatalog"
import { productPropType } from "./types/PropTypes";

const Product = ({ product,text, onAddToCart, handleQuantityChange }) => {

  return (
    <div className="product-container">
      <h2 className="product-title">{product.title}</h2>
      <p className="product-description">{product.description}</p>
      <div className="product-details">
        <span className="product-code"> Code: {product.code}</span>
        <span className="product-price"> Price: ${product.price}</span>
        <span className="product-stock"> Available Stock: {product.stock}</span>
        {product.categories && product.categories.length > 0 && (
          <p className="product-categories">
            Categories: {product.categories.map(category => category.categoryName).join(', ')}
          </p>
        )}
      </div>
      <ProductCatalog
        product={product}
        onAddToCart={onAddToCart}
        text={text}
        handleQuantityChange={handleQuantityChange}
      />
    </div>
  );
};

Product.propTypes = {
  product: productPropType.isRequired,
  text: PropTypes.string,
  onAddToCart: PropTypes.func,
  handleQuantityChange: PropTypes.func.isRequired,
};

export default Product;
