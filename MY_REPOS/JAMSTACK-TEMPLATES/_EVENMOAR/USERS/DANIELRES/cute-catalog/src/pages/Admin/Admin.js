import React from "react";

import Loader from "shared/Loader";
import ProductForm from "./ProductForm/index";
import Products from "./Products";

const Admin = ({ currentUser, isLoading }) => (
  <Loader isLoading={isLoading}>
    <p>Logged in as: {currentUser.name}</p>

    <div className="row">
      <div className="col-4 col-sm-6">
        <Products />
      </div>

      <div className="col">
        <ProductForm />
      </div>
    </div>
  </Loader>
);

export default Admin;
