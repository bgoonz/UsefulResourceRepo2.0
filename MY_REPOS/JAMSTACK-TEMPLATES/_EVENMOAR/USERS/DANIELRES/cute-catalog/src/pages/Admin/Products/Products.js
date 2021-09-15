import { NavLink } from "redux-first-router-link";
import React from "react";

import { toAdminProduct } from "store/routerActions";

import ProductCard from "shared/ProductCard";

export default ({ products }) => (
  <>
    <div className="card-deck no-gutters">
      <NavLink
        className="d-flex col-6 col-md-3 link-no-underline"
        to={toAdminProduct({ productId: "new" })}
      >
        <div className="card mb-4 border-0 align-self-center w-100">
          <div className="text-center h3">+</div>
        </div>
      </NavLink>

      {products.map((product) => (
        <NavLink
          key={product.id}
          className="d-flex col-6 col-md-3"
          to={toAdminProduct({ productId: product.id })}
        >
          <ProductCard imageOnly product={product} />
        </NavLink>
      ))}
    </div>
  </>
);
