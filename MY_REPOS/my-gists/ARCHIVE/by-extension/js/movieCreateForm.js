import { useEffect, useState } from "react";

const movieCreateForm = (props) => {
  const { categories } = props;

  const defaultData = {
    name: "",
    description: "",
    rating: "",
    image: "",
    cover: "",
    longDesc: "",
  };

  const formData = props.initialData ? { ...props.initialData } : defaultData;
  const [form, setForm] = useState(formData);

  useEffect(() => {
    props.initialData && setForm(props.initialData);
  }, [props.initialData]);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;

    setForm({
      ...form,
      [name]: target.value,
    });
  };

  const handleGenreChange = (event) => {
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
      genre: value.toString(),
    });
  };

  const submitForm = () => {
    props.handleFormSubmit({ ...form });
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            name="name"
            value={form.name}
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Lord of the Rings"
          />
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
            placeholder="Somewhere in Middle-earth..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Rating</label>
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
            onChange={handleGenreChange}
            name="genre"
            multiple
            className="form-control"
            id="genre"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={submitForm} type="button" className="btn btn-primary">
          Create Movie
        </button>
      </form>
    </div>
  );
};

export default movieCreateForm;
