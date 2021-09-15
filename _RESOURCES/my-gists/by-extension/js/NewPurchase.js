// import React, { Component

import React, { Component } from "react";
import { purchase } from "../auth";

class Purchase extends Component {
  constructor() {
    super();

    const products = [];

    for (let i = 0; i < 5; i++) {
      // console.log(i)
      products.push({
        company: "",
        product: "",
        batch: "",
        quantity: 0,

        error: "",
      });
      //console.log(i)
    }

    this.state = {
      activeInputs: [0],
      company: "",
      product: "",
      batch: "",
      quantity: 0,
      products,
      selectedProduct: "",
      currentOption: "",
      dependedOption: "",
      batches: { 0: [] },
      options: [
        {
          product: "vicks",
          batch: "v1",
          quantity: "123",
        },
        {
          product: "vicks",
          batch: "v2",
          quantity: "124",
        },
        {
          product: "vicks",
          batch: "v3",
          quantity: "125",
        },
        {
          product: "vanila",
          batch: "v10",
          quantity: "125",
        },
      ],
    };
  }

  canEditInput(index) {
    return this.state.activeInputs.includes(index);
  }

  // };
  handleChangecomp = (index) => (evt) => {
    const newproducts = this.state.products.map((prodarray1, idx) => {
      if (idx !== index) return prodarray1;
      return { ...prodarray1, company: evt.target.value };
    });
    this.setState({ products: newproducts });
  };

  handleChangeProd = (index) => (evt) => {
    const newproducts = this.state.products.map((prodarray1, idx) => {
      if (idx !== index) return prodarray1;
      return { ...prodarray1, product: evt.target.value };
    });
    const activeInputs = [...this.state.activeInputs, index];
    this.setState({ products: newproducts, activeInputs });
  };

  handleChangeBatch = (index) => (evt) => {
    const newproducts = this.state.products.map((prodarray1, idx) => {
      if (idx !== index) return prodarray1;
      return { ...prodarray1, batch: evt.target.value };
    });
    this.setState({ products: newproducts, activeInputIndex: index });
  };

  handleChangeQty = (index) => (evt) => {
    const newproducts = this.state.products.map((prodarray1, idx) => {
      if (idx !== index) return prodarray1;
      return { ...prodarray1, quantity: evt.target.value };
    });
    this.setState({ products: newproducts });
  };

  clickSubmit = (event) => {
    event.preventDefault();

    const prodarray = this.state;
    console.log(prodarray.company);

    console.log("prodarray");
    console.log(prodarray);
    console.log(prodarray.product);

    console.log("prodarry products");
    console.log(prodarray.products);
    console.log(prodarray.products[0].product);

    this.state.products.map((prodarray, index) =>
      console.log(prodarray.company)
    );

    console.log(prodarray.products[0].company);
    // const user = prodarray...does not work
    const user = { prodarray };

    purchase(user).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          error: "",
          company: "",
          product: "",
          batch: "",
          quantity: "",
          open: true,
        });
    });
  };

  purchase = (user) => {
    return fetch(
      "http://localhost:8080/purchase",

      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };
  // componentDidMount() {
  //   // fetch('http://localhost:8090/users')
  //   // fetch('http://localhost:8080/adminproduct')
  //   fetch("http://localhost:8080/allproducts")
  //     // fetch(`https://jsonplaceholder.typicode.com/users`)
  //     .then(response => response.json())
  //     .then(options => this.setState({ options: options }))
  // }
  onChange = (index) => (event) => {
    const product = event.target.value;
    // const batches = [];

    // const foundOption = this.state.options.filter(o => o.product === value);
    // batches.push(foundOption.batch).map(fi => fi.batch);
    const batches = this.state.options
      .filter((item) => item.product === product)
      .map((fi) => fi.batch);

    debugger;
    const batchesCopy = { ...this.state.batches };
    batchesCopy[index] = batches;

    this.setState({
      //currentOption: value,
      // dependedOptions: [...dependedOptions]
      batches: batchesCopy,
      selectedProduct: product,
    });
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Purchase</h2>

        <form>
          <div className="form-group"></div>

          {this.state.products.map((prodarray, index) => (
            <div className="form-group">
              <tr key={index}>
                <td>
                  <lable className="text-muted">Company</lable>
                  <input
                    id={index}
                    onChange={this.handleChangecomp(index)}
                    type="text"
                    className="form-control"
                    value={prodarray.company}
                  />
                </td>
                {/* <td>
                  <lable className="text-muted">Product</lable>
                  <input onChange={this.handleChangeProd(index)} type="text" className="form-control" />
                </td> */}
                <td>
                  {/* <lable className="text-muted">Product</lable>
                  <select onChange={this.handleChangeProd(index)} type="option" className="form-control">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select> */}
                </td>
                <td>
                  <lable className="text-muted">Product</lable>
                  <select
                    onInput={this.handleChangeProd(index)}
                    type="option"
                    className="form-control"
                    value={this.currentOption}
                    onChange={this.onChange(index)}
                  >
                    <option value="">Select one...</option>
                    {this.state.options.map((option, index) => (
                      <option key={index} value={option.product}>
                        {option.product}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <lable className="text-muted">Batch</lable>
                  <select
                    onChange={this.handleChangeBatch(index)}
                    type="option"
                    className="form-control"
                    value={this.dependedOption}
                    onChang3={this.onChange2}
                  >
                    <option value="">Select one...</option>
                    {this.canEditInput(index) &&
                      this.state.batches[index] &&
                      this.state.batches[index].map((batch, index) => (
                        <option key={index} value={batch}>
                          {batch}
                        </option>
                      ))}
                  </select>
                </td>
                {/* <td>
                  <lable className="text-muted">Batch</lable>
                  <input onChange={this.handleChangeBatch(index)} stype="text" className="form-control" />
                </td> */}
                <td>
                  <lable className="text-muted">Quantity</lable>
                  <input
                    disabled={!this.canEditInput(index)}
                    onChange={this.handleChangeQty(index)}
                    type="number"
                    className="form-control"
                  />
                </td>
              </tr>
            </div>
          ))}

          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Purchase;
