import React, { useState } from "react";

const Modal = (props) => {
  return (
    <div>
      <button
        type="button"
        className="button is-medium is-info is-outlined"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Open
      </button>
      <div className="modal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Make a Deal</p>
            <button className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <h1>Hello I am Modal! (:</h1>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success">Save changes</button>
            <button className="button">Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Modal;
