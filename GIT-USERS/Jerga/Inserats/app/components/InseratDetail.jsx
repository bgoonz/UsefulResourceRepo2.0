import React, { Component } from "react";

const InseratDetail = (props) => {
  const { name, title, city, price } = props.inserat;

  return (
    <tr>
      <td>{name}</td>
      <td>{title}</td>
      <td>{city}</td>
      <td>{price}</td>
    </tr>
  );
};

export default InseratDetail;
