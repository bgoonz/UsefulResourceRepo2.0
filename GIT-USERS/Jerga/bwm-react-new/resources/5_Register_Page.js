<div className="bwm-form">
  <div className="row">
    <div className="col-md-5">
      <h1 className="page-title">Register</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" />
          {/* <div className="alert alert-danger">
            <div *ngIf="username.errors.required">
              Username is required.
            </div>
          </div> */}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>

        <div className="form-group">
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordConfirmation"
          />
        </div>
        <button type="submit" className="btn btn-bwm-main">
          Submit
        </button>
      </form>
      {/* <div className="alert alert-danger">
        <p>
          Some Error
        </p>
      </div> */}
    </div>
    <div className="col-md-6 ml-auto">
      <div className="image-container">
        <h2 className="catchphrase">
          As our member you have access to most awesome places in the world.
        </h2>
        <img src="/images/register-image.jpg" alt="Register an user" />
      </div>
    </div>
  </div>
</div>;
