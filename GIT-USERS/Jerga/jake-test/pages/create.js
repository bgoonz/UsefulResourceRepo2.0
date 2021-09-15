import { useState } from "react";
import { createActivity } from "../actions";

const Create = (props) => {
  const defaultData = {
    name: "",
    description: "",
    rating: "",
    image: "",
    cover: "",
    longDesc: "",
  };

  const formData = defaultData;

  const [form, setForm] = useState(formData);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;

    setForm({
      ...form,
      [name]: target.value,
    });
  };

  const handleCategoryChange = (event) => {
    const { options } = event.target;
    const optionsLength = options.length;
    let value = [];

    for (let i = 0; i < optionsLength; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    setForm({
      ...form,
      category: value.toString(),
    });
  };

  const submitForm = () => {
    createActivity({ ...form });
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          value={form.name}
          onChange={handleChange}
          type="text"
          className="form-control"
          id="name"
          name="name"
          aria-describedby="emailHelp"
          placeholder="Lord of the Rings"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          onChange={handleChange}
          value={form.description}
          type="text"
          className="form-control"
          id="description"
          name="description"
          placeholder="Somewhere in Middle-earth..."
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Rating</label>
        <input
          onChange={handleChange}
          value={form.rating}
          type="number"
          max="5"
          min="0"
          className="form-control"
          id="rating"
          name="rating"
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
          type="text"
          className="form-control"
          id="image"
          name="image"
          placeholder="http://....."
        />
      </div>
      <div className="form-group">
        <label htmlFor="cover">Cover</label>
        <input
          onChange={handleChange}
          value={form.cover}
          type="text"
          className="form-control"
          id="cover"
          name="cover"
          placeholder="http://......"
        />
      </div>
      <div className="form-group">
        <label htmlFor="longDesc">Long Description</label>
        <textarea
          onChange={handleChange}
          value={form.longDesc}
          className="form-control"
          id="longDesc"
          name="longDesc"
          rows="3"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          onChange={handleCategoryChange}
          multiple
          className="form-control"
          id="category"
          name="category"
        >
          <option>Adventure Sports</option>
          <option>Attractions</option>
          <option>Art, Crafts and Cooking</option>
          <option>Birthday Parties</option>
          <option>Events</option>
          <option>Holiday Camps</option>
          <option>Parks and Skate Parks</option>
          <option>Performing Arts</option>
          <option>Play Centres</option>
          <option>Sport and Games</option>
          <option>Theme Parks and Water Parks</option>
        </select>
      </div>
      <button onClick={submitForm} type="button" className="btn btn-primary">
        Add Activity
      </button>
    </form>
  );
};

export default Create;
