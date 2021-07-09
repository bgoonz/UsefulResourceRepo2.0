import React from "react";

const Parents = (props) => {
  return (
    <section className="parents">
      {props.family.parents.map((p) => (
        <div className="person" key={p.name}>
          <img width="150" src={p.img} alt={p.name} />
          <strong>{p.name}</strong>
        </div>
      ))}
    </section>
  );
};

export default Parents;
