// @flow
import * as React from "react";
import type { PortfolioForm } from "../types";

type Props = {
  onSubmit: Function,
  portfolioForm: PortfolioForm,
  updateForm: Function,
};

const errorStyle = {
  background: "#e9c2c2",
  color: "darkred",
  fontWeight: "bold",
  padding: 20,
  marginBottom: 20,
};

export default ({
  onSubmit,
  portfolioForm: { data, hasErrors, errors },
  updateForm,
}: Props) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit(data);
    }}
  >
    {hasErrors && (
      <div style={errorStyle}>
        {Object.entries(errors).map(([k, v]) => (
          <li key={k}>{v}</li>
        ))}
      </div>
    )}
    <div>
      <label htmlFor="coin">Coin</label>
      <input name="coin" onChange={updateForm} type="text" value={data.coin} />
    </div>
    <div>
      <label htmlFor="date">Date</label>
      <input name="date" onChange={updateForm} type="text" value={data.date} />
    </div>
    <div>
      <label htmlFor="price">Price</label>
      <input
        name="price"
        onChange={updateForm}
        type="text"
        value={data.price}
      />
    </div>
    <button>Submit</button>
  </form>
);
