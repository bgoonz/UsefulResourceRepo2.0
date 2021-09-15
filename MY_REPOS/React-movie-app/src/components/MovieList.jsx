import React from "react";

const MovieList = props => {
  return (
    <div className="row">
      {props.movies.map(movie => (
        <div className="col-sm-6 col-md-4 col-lg-3" key={movie.id}>
          <div className="card mb-4 shadow-sm">
            <img
              className="card-img-top"
              src={movie.imageURL}
              alt="Sample Movie"
            />
            <div className="card-body">
              <h5 className="card-title">{movie.name}</h5>
              <p className="card-text">{movie.overview}</p>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  onClick={event => props.deleteMovieProp(movie)}
                  type="button"
                  className="btn btn-md btn-outline-danger"
                >
                  Delete
                </button>
                <h2 className="m-0">
                  <span className="badge bg-secondary">{movie.rating}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
