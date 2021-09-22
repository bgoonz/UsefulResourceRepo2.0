import React from "react";

function Book(props) {
  //console.log(props)
  return (
    <div className="row col-sm-12 col-md-6 mt-5">
      {props.imgUrl ? (
        <div className="imgdiv">
          <img className="img-fluid" src={props.imgUrl.thumbnail} alt="" />
        </div>
      ) : (
        <p>No image available</p>
      )}
      <div className="card border-0" style={{ width: "20rem" }}>
        <div className="card-body text-left p-1">
          <h5 className="card-title">{props.title}</h5>
          {props.authors ? (
            <div>
              {props.authors.map((author) => (
                <h6 className="card-subtitle mb-2 text-muted">{author}</h6>
              ))}
            </div>
          ) : (
            <h6 className="card-subtitle mb-2 text-muted">No Authors listed</h6>
          )}
          <p className="card-text">{props.publisher}</p>
          <a
            id="seymour"
            href={props.info}
            className="card-link btn btn-warning position-relative"
            role="button"
          >
            See More
          </a>
          <hr className="base" />
        </div>
      </div>
    </div>
  );
}

export default Book;
