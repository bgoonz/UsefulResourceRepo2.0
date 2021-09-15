import React, { useState, useEffect } from "react";
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import "./ProductView.css";

function ProductView({ products }) {
  //Bonus using localStorage, otherwise useState('')
  const [selectedProduct, setSelectedProduct] = useState(
    localStorage.getItem("selectedProduct")
      ? JSON.parse(localStorage.getItem("selectedProduct"))
      : ""
  );

  //Bonus using localStorage, otherwise useState(true)
  const [sideOpen, setSideOpen] = useState(
    localStorage.getItem("productSidePanelOpen") &&
      localStorage.getItem("productSidePanelOpen") === "true"
  );

  // Open side panel when product is selected
  // Bonus uses the localStorage.setItem
  useEffect(() => {
    if (selectedProduct) setSideOpen(true);
    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
  }, [selectedProduct]);

  // Deselect product when side panel is closed
  // Bonus uses the localStorage.setItem
  useEffect(() => {
    console.log(`sideOpen CHANGED TO`, sideOpen);
    if (!sideOpen) setSelectedProduct("");
    localStorage.setItem("productSidePanelOpen", JSON.stringify(sideOpen));
  }, [sideOpen]);

  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map((item) => (
            <ProductListItem
              isSelected={selectedProduct && selectedProduct.id === item.id}
              key={item.id}
              product={item}
              onClick={() => setSelectedProduct(item)}
            />
          ))}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div
            className="product-side-panel-toggle"
            onClick={() => setSideOpen(!sideOpen)}
          >
            {sideOpen ? ">" : "<"}
          </div>
        </div>
        <ProductDetails product={selectedProduct} visible={sideOpen} />
      </div>
    </div>
  );
}

export default ProductView;
