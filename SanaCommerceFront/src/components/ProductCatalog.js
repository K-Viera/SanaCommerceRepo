import React from "react";
import { productPropType } from "./types/PropTypes";
import PropTypes from "prop-types";

const ProductCatalog = ({
  product,
  text,
  onAddToCart,
  handleQuantityChange,
}) => {
  return (
    <>
      <input
        type="number"
        className="product-quantity"
        value={product.quantity}
        //conver to string value
        onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
      />
      {text && (
        <>
          {" "}
          <button
            className="product-btn"
            onClick={() => onAddToCart(product.id, product.quantity)}
          >
            {text}
          </button>
        </>
      )}
    </>
  );
};

ProductCatalog.propTypes = {
  product: productPropType.isRequired,
  text: PropTypes.string,
  onAddToCart: PropTypes.func.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
};

export default ProductCatalog;
