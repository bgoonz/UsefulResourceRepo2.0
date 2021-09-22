import React, { Component } from "react";
import Button from "../../UI/Button/Button";
interface OrderSummaryProps {
  ingredients: {
    [key: string]: number;
  };
  price: number;
  purchaseContinued: () => void;
  purchaseCanceled: () => void;
}

interface OrderSummaryState {}

class OrderSummary extends Component<OrderSummaryProps, OrderSummaryState> {
  constructor(props: any) {
    super(props);
  }
  ingredientSummary = Object.keys(this.props.ingredients).map(
    (igKey, index) => {
      return (
        <li key={index}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    }
  );
  render() {
    return (
      <div>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>{this.ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </div>
    );
  }
}

export default OrderSummary;
