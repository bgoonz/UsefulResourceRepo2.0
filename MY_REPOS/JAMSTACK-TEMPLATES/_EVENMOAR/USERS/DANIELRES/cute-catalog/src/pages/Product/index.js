import { connect } from "react-redux";

import getNextItem from "./getNextItem";
import getPrevItem from "./getPrevItem";

import Product from "./Product";

const emptyObject = {};

const mapStateToProps = ({ location, products }) => {
  const { productId } = location.payload;
  const product = products.items[productId] || emptyObject;

  const reversed = true;
  const nextItem =
    getNextItem({ items: products.items, currId: product.id }) || emptyObject;
  const prevItem =
    getPrevItem({ items: products.items, currId: product.id }) || emptyObject;

  const nextProduct = reversed ? prevItem : nextItem;
  const prevProduct = reversed ? nextItem : prevItem;

  return {
    isLoading: !product.title,
    nextProduct,
    prevProduct,
    product,
  };
};

export default connect(mapStateToProps)(Product);
