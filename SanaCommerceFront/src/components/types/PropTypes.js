import PropTypes from "prop-types";
export const productPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    categoryName: PropTypes.string,
  })),
});



export const productCartPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
});