import Link from "redux-first-router-link";
import React from "react";

import { toProduct } from "store/routerActions";

import ProductCard from "shared/ProductCard";

export default ({ products }) => (
  <>
    <h2 className="invisible">Products</h2>

    <div className="card-deck no-gutters">
      {products.map((product) => (
        <Link
          className="d-flex col-sm-6 col-md-4 col-xl-3 link-gray"
          key={product.id}
          to={toProduct({ productId: product.id })}
        >
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  </>
);
