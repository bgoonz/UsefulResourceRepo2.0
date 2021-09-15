import React from "react";
//import ReactDOM from "react-dom";

import "./styles.css";

class Pbqp extends React.Component {
  state = {
    selectedProduct: "",
    // UPDATES: Selected Batch to keep track of current batch
    selectedBatch: "",
    batches: [],
    quantities: [],
    prices: [],
    items: [
      {
        product: "vicks",
        batch: "v1",
        quantity: "23",
        price: "123",
      },
      {
        product: "vicks",
        batch: "v2",
        quantity: "4563",
        price: "124",
      },
      {
        product: "adidas",
        batch: "v3",
        quantity: "2312",
        price: "125",
      },
      {
        product: "adidas",
        batch: "a1",
        quantity: "5000",
        price: "900",
      },
      {
        product: "Mitsubishi",
        batch: "m1",
        quantity: "9000",
        price: "1256",
      },
      {
        product: "Mitsubishi",
        batch: "m2",
        quantity: "600",
        price: "12345",
      },
    ],
  };

  onProductChange = (event) => {
    const product = event.target.value;
    const batches = this.state.items
      //const quantities = this.state.items
      .filter((item) => item.product === product)
      .map((fi) => fi.batch);
    // .filter(item => item.product === product)
    // .map(fi => fi.quantity)

    this.setState({
      batches: [...batches],
      // quantities: [...quantities],
      // UPDATES: Reset prices, quantities, and selectedBatch
      selectedBatch: "",
      quantities: [],
      prices: [],
      selectedProduct: product,
    });
  };

  onBatchChange = (event) => {
    const batch = event.target.value;
    const { items, selectedProduct } = this.state;

    const quantities = items
      .filter((o) => o.batch === batch && o.product === selectedProduct)
      .map((fi) => fi.quantity);
    const prices = items
      .filter((o) => o.batch === batch && o.product === selectedProduct)
      .map((fi) => fi.price);
    //const prices = items
    //.filter()
    this.setState({
      quantities: quantities,
      prices: prices,
      // UPDATES: Set selected batch
      selectedBatch: batch,
      // prices: prices
    });
    // this.setState({
    //   prices: prices
    // });
  };

  // this.state.options.map((option, index) => (
  render() {
    const uniqueItems = [
      ...new Set(this.state.items.map((item) => item.product)),
    ];

    return (
      <div className="App">
        <h1>Select option from first select</h1>
        {/* First select */}
        <select className="form-control" onChange={this.onProductChange}>
          <option value="">Select one...</option>
          {uniqueItems.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Generated depending on first select */}
        <select
          value={this.state.selectedBatch}
          className="form-control"
          onChange={this.onBatchChange}
        >
          <option value="">Select one...</option>
          {this.state.batches.map((batch, index) => (
            <option key={index} value={batch}>
              {batch}
            </option>
          ))}
        </select>
        <select className="form-control" onChange={() => {}}>
          <option value="">Select one...</option>
          {this.state.quantities.map((quantity, index) => (
            <option key={index} value={quantity}>
              {quantity}
            </option>
          ))}
        </select>
        <select className="form-control" onChange={() => {}}>
          <option value="">Select one...</option>
          {this.state.prices.map((price, index) => (
            <option key={index} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
export default Pbqp;
