import React from 'react';

const ProductCatalog = ({ product, quantity, onAddToCart, handleChange }) => {
  return (
    <>
      <input
        type="number"
        className="product-quantity"
        value={quantity}
        onChange={handleChange}
      />
      <button
        className="product-btn"
        onClick={() => onAddToCart(product.id, quantity)}
      >
        Add to Cart
      </button>
    </>
  );
};

export default ProductCatalog;