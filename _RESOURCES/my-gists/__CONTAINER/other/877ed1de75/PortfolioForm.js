<div className="form-group">
  <label htmlFor="title">Title</label>
  <input
    // required, maxLength validators
    // you need to provide values to the inputs and max lenght of characters is 30
    ref={register({ required: true, maxLength: 30 })}
    name="title"
    type="text"
    className="form-control"
    id="title"
  />
  // Check for "title" errors
  {errors.title && (
    // if errors then display alert
    <Alert variant="danger">
      // if title error type is "required" display following message
      {errors.title?.type === "required" && <p>Title is required</p>}
      // if title error type is "maxLength" display following message
      {errors.title?.type === "maxLength" && (
        <p>Max length of title is 30 characters!</p>
      )}
    </Alert>
  )}
  <div className="form-group">
    <label htmlFor="city">Company</label>
    <input
      ref={register({ required: true, minLength: 5 })}
      name="company"
      type="text"
      className="form-control"
      id="company"
    />
    {errors.company && (
      <Alert variant="danger">
        {errors.company?.type === "required" && <p>Company is required</p>}
        {errors.company?.type === "minLength" && (
          <p>Min length of title is 5 characters!</p>
        )}
      </Alert>
    )}
  </div>
  <div className="form-group">
    <label htmlFor="city">Company Website</label>
    <input
      ref={register({
        required: true,
        pattern:
          /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      })}
      name="companyWebsite"
      type="text"
      className="form-control"
      id="companyWebsite"
    />
    {errors.companyWebsite && (
      <Alert variant="danger">
        {errors.companyWebsite?.type === "required" && (
          <p>Website is required</p>
        )}
        {errors.companyWebsite?.type === "pattern" && <p>Enter a valid url!</p>}
      </Alert>
    )}
  </div>
</div>;
