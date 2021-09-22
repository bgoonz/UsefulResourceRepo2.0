import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchChats } from "../actions/Logina";
import { useDispatch } from "react-redux";
import firebase from "firebase/app";
import "firebase/database";
import db from "../db/firestore";
import "firebase/messaging";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    parse(data);
  };

  let emailinput;
  let passwordinput;

  function parse({ email, password }) {
    emailinput = email;
    passwordinput = password;
    // console.log("loggger: "+ emailinput, passwordinput)
    dispatch(fetchChats(email, password));
    // console.log("LOOOOOOGGGGG");
  }

  const messaging = firebase.messaging();
  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  messaging
    .getToken({
      vapidKey:
        "BKftX8XPzM_RpzGkx1QXpEwbIR2Fhvnj3DW8srsHCIyJ-nwQWeHNoLuVm65E8c4GARZ2Xcsb3wZNICg2v6_bHnY",
    })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
      <div className="header">Welcome here!</div>
      <div className="subheader">Login and chat with other people!</div>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            ref={register}
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            ref={register}
            type="password"
            name="password"
            className="form-control"
            id="password"
          />
        </div>
        {false && <div className="alert alert-danger small">Some error</div>}
        <button type="submit" className="btn btn-outline-primary">
          Login
        </button>
      </div>

      {/* <!-- Button trigger modal --> */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>

      {/* <!-- Modal --> */}
      <div
        style={{
          display: isOpen ? "block" : "none",
        }}
        className="modal fade show"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
