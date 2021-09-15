<div className="container">
  <div className="py-5 text-center">
    <h2>Keep Resources</h2>
    <p className="lead">Keep your resource at once place</p>
  </div>
  <div className="row">
    <div className="col-md-4 order-md-2 mb-4">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Your Resources</span>
        <span className="badge badge-secondary badge-pill">6</span>
      </h4>
      {/* Seach Inputs Starts */}
      <form className="card p-2">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Some title"
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary">
              Search
            </button>
          </div>
        </div>
      </form>
      {/* Seach Inputs Ends */}
      {/* Resource List Starts */}
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">Resource 1</h6>
            <small className="text-muted">Brief description</small>
          </div>
          <span className="text-muted">type</span>
        </li>
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">Resource 2</h6>
            <small className="text-muted">Brief description</small>
          </div>
          <span className="text-muted">type</span>
        </li>
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">Resource 3</h6>
            <small className="text-muted">Brief description</small>
          </div>
          <span className="text-muted">type</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <div>
            <h6 className="my-0">Resource 4</h6>
            <small className="text-muted">Brief description</small>
          </div>
          <span className="text-muted">type</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <div>
            <h6 className="my-0">Resource 5</h6>
            <small className="text-muted">Brief description</small>
          </div>
          <span className="text-muted">type</span>
        </li>
        <li className="list-group-item d-flex justify-content-between bg-light">
          <div className="text-success">
            <h6 className="my-0">Resource 6</h6>
            <small className="text-muted">Brief description</small>
          </div>
          <span className="text-muted">type</span>
        </li>
      </ul>
      {/* Resource List Ends */}
    </div>
    {/* Update Form Starts */}
    {/* <div className="col-md-8 order-md-1">
      <h4 className="mb-3">Update Resource</h4>
      <form>
        <div className="mb-3">
          <label htmlFor="firstName">Title</label>
          <input type="text" className="form-control" id="firstName" placeholder="How to survice in mountains" />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Description <span className="text-muted">(Optional)</span></label>
          <input type="email" className="form-control" id="email" placeholder="Very interesting book" />
        </div>
        <div className="mb-3">
          <label for="description">Description</label>
          <textarea className="form-control" id="description" placeholder="Just some description"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="username">Resource Link</label>
          <div className="input-group">
            <input type="text" className="form-control" id="username" placeholder="Username" />
          </div>
        </div>
        <hr className="mb-4" />
        <button className="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
      </form>
    </div> */}
    {/* Update Form Ends */}
    {/* Detail View Starts */}
    <div className="col-md-8 order-md-1">
      <h4 className="mb-3">Update Resource</h4>
      <div className="card">
        <div className="card-header">Resource Name</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>Resource description...</p>
            <footer className="text-muted mb-2">Type</footer>
          </blockquote>
          <a href="#" className="btn btn-primary">
            Edit
          </a>
        </div>
      </div>
    </div>
    {/* Detail View Ends */}
  </div>
</div>;
