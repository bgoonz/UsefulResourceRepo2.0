import { connect } from "react-redux";

import * as api from "api";
import { fetchProducts } from "store/products/actions";

import ProductForm from "./ProductForm";

const emptyObject = {};
const newProduct = { title: "", description: "", imageSrc: "" };

const mapStateToProps = ({
  products: { items: products },
  location: { query: { product: productId } = emptyObject } = emptyObject,
}) => {
  const isNew = productId === "new";

  return {
    isNew,
    product: (isNew ? newProduct : products[productId]) || emptyObject,
  };
};

const mapDispatchtoProps = (dispatch) => ({
  createProduct: (values) => api.admin.createProduct(values),
  refreshProducts: () => dispatch(fetchProducts()),
  updateProduct: (id, values) => api.admin.updateProduct(id, values),
});

const mergeProps = (
  { isNew, product },
  { createProduct, refreshProducts, updateProduct }
) => {
  const submit = (values) =>
    isNew ? createProduct(values) : updateProduct(product.id, values);

  return {
    onSubmit: (values) =>
      submit(values).then(refreshProducts).catch(console.error),
    product,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps,
  mergeProps
)(ProductForm);
