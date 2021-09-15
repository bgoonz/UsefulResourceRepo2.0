import React, { useState } from "react";
import withAuthorization from "components/hoc/withAuthorization";
import { Redirect } from "react-router-dom";

import { createService } from "actions";

const ServiceCreate = ({ auth }) => {
  const [redirect, setRedirect] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    category: "mathematics",
    title: "",
    description: "",
    image: "",
    price: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceForm({ ...serviceForm, [name]: value });
  };

  const handleSubmit = () => {
    const { user } = auth;
    createService(serviceForm, user.uid)
      .then(() => setRedirect(true))
      .catch(() => alert("SOME ERROR!"));
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="create-page">
      <div className="container">
        <div className="form-container">
          <h1 className="title">Create Service</h1>
          <form>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select">
                  <select name="category" onChange={handleChange}>
                    <option value="mathematics">Mathematics</option>
                    <option value="programming">Programming</option>
                    <option value="painting">Painting</option>
                    <option value="singing">Singing</option>
                    <option value="english">English</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  onChange={handleChange}
                  name="title"
                  className="input"
                  type="text"
                  placeholder="Text input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  onChange={handleChange}
                  name="description"
                  className="textarea"
                  placeholder="Textarea"
                ></textarea>
              </div>
            </div>
            <div className="field">
              <label className="label">Image Url</label>
              <div className="control">
                <input
                  onChange={handleChange}
                  name="image"
                  className="input"
                  type="text"
                  placeholder="Text input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Price per Hour</label>
              <div className="control">
                <input
                  onChange={handleChange}
                  name="price"
                  className="input"
                  type="number"
                  placeholder="Text input"
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="button is-link"
                >
                  Create
                </button>
              </div>
              <div className="control">
                <button className="button is-text">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuthorization(ServiceCreate);
