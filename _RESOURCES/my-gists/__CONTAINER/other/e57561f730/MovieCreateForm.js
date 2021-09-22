import React, { useState, useEffect } from "react";

const MovieCreateForm = ({ movieData }) => {
  const [movieDataLoaded, setMovieDataLoaded] = useState(false);
  // uncontrolled data error, occurs if the inputs are not given a default value durng state initialization
  const [form, setForm] = useState({
    name: "",
    rating: "",
    description: "",
    image: "",
    cover: "",
    longDesc: "",
  });

  // This will be used to initialize the form by populating it with movie data passed through the props
  useEffect(() => {
    if (movieData) {
      setForm(movieData); // populate the movie edit form with movie data of the current movie
    } else {
      alert("Some issue with useEffect");
    }
  }, [movieData]); // To make sure that the component is not called/re-rendered everytime and only when the movie data is loaded

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name; //This gets updated everytime the input is selected and as value is provided

    setForm({
      ...form, //Destructurizing prev values from the form
      [name]: target.value, //=> key/which input is being updated(which is retrieved from the name) :
      //[name] => denotes/addresses teh current input that's being updated, target.value => values entered in respective input
    });
  };

  const handleGenreChange = (event) => {
    const { options } = event.target; // => const options = event.target.options, when var & attr name are same
    const optionsCount = options.length;
    let value = [];
    for (let i = 0; i < optionsCount; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setForm({
      ...form,
      genre: value.toString(),
    });
  };

  const submitForm = () => {
    // submitForm -> handleFormSubmit() -> handleCreateMovie() -> createMovie() -> handleCreateMovie()
    // -----------------------this file -> props ->             fn() passed thru props -> actions/index -> sidenav.js
    // invoke function here, to create movie, as per the props
    props.handleFormSubmit({ ...form }); //passing a copy of the form, as *form* -> pass by ref, so any changes done anywhere, reflects here
    // form and ...form point to different memory space
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          onChange={handleChange}
          value={form.name}
          name="name"
          type="text"
          className="form-control"
          id="name"
          aria-describedby="emailHelp"
          placeholder="Padam"
        />
        {/* providing value attr, without an onChange handler, will cause input to be read only and can't enter values */}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          onChange={handleChange}
          value={form.description}
          name="description"
          type="text"
          className="form-control"
          id="description"
          placeholder="Short Description"
        />
      </div>
      <div className="form-group">
        <label htmlFor="rating">Rating</label>
        <input
          onChange={handleChange}
          value={form.rating}
          name="rating"
          type="number"
          max="5"
          min="0"
          className="form-control"
          id="rating"
          placeholder="3"
        />
        <small id="emailHelp" className="form-text text-muted">
          Max: 5, Min: 0{" "}
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          onChange={handleChange}
          value={form.image}
          name="image"
          type="text"
          className="form-control"
          id="image"
          placeholder="http://....."
        />
      </div>
      <div className="form-group">
        <label htmlFor="cover">Cover</label>
        <input
          onChange={handleChange}
          value={form.cover}
          name="cover"
          type="text"
          className="form-control"
          id="cover"
          placeholder="http://......"
        />
      </div>
      <div className="form-group">
        <label htmlFor="longDesc">Long Description</label>
        <textarea
          onChange={handleChange}
          value={form.longDesc}
          name="longDesc"
          className="form-control"
          id="longDesc"
          rows="3"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="genre">Genre</label>
        <select
          multiple
          onChange={handleGenreChange}
          className="form-control"
          id="genre"
        >
          <option>Drama</option>
          <option>Crime</option>
          <option>Adventure</option>
          <option>Thriller</option>
          <option>Historical</option>
          <option>Action</option>
        </select>
      </div>
      <button onClick={submitForm} type="button" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default MovieCreateForm;
