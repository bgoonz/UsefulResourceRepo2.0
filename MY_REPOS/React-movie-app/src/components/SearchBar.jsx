import React from "react";

class SearchBar extends React.Component {
  handleFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-row my-5">
          <div className="col-lg-12">
            <input
              typle="text"
              className="form-control"
              placeholder="Search a movie"
              onChange={this.props.searchMovieProp}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
