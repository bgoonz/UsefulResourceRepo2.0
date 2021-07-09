import React, { useContext } from "react";
import FamilyContext from "./../contexts/FamilyContext";

const Siblings = () => {
  const family = useContext(FamilyContext);

  return (
    <section className="parents">
      {/*
        Consumer Pattern
       <FamilyContext.Consumer>
        {
          (family)=> {
            return (<div>
              {family.siblings.map((p) => (
                <div className="person" key={p.name}>
                  <img width="150" src={p.img} alt={p.name} />
                  <strong>{p.name}</strong>
                </div>
              ))}
            </div>)
          }
        }
      </FamilyContext.Consumer> */}

      {family.siblings.map((p) => (
        <div className="person" key={p.name}>
          <img width="150" src={p.img} alt={p.name} />
          <strong>{p.name}</strong>
        </div>
      ))}
    </section>
  );
};

export default Siblings;
