import React, { Component } from "react";
import "./App.css";
import Book from "./Book";
import Footer from "./Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);
library.add(faBook);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      items: [],
      searchWord: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    //alert('A name was submitted: ' + this.state.value);
    fetch("https://www.googleapis.com/books/v1/volumes?q=" + this.state.value)
      .then((res) => res.json())
      /*.then(data => this.setState({items: data.items}));*/
      .then((data) => {
        var bookshelf = [];
        for (let j = 0; j < data.items.length; j += 2) {
          bookshelf.push(data.items.slice(j, j + 2));
        }
        this.setState({ items: bookshelf });
        //this.setState({items: data.items});
        //console.log(data);
        //console.log(items);
      });
    this.setState({ value: "", searchWord: this.state.value });
    e.preventDefault();
  }

  render() {
    const { items } = this.state;
    return (
      <div className="">
        <h1 className="text-center d-block">
          Book Finder <FontAwesomeIcon icon={faBook} />
        </h1>
        <div id="top-bar" className="container mb-5">
          <div className="row justify-content-center">
            <form
              id="search-form"
              className="col-xs-6 col-sm-4 d-block"
              onSubmit={this.handleSubmit}
            >
              <input
                className="d-block form-control mt-3"
                type="text"
                value={this.state.value}
                placeholder="Enter search keyword"
                onChange={this.handleChange}
              />
              <div>
                <button
                  id="get-btn"
                  type="submit"
                  value="Submit"
                  className="btn btn-success d-block form-control mt-3"
                >
                  <FontAwesomeIcon icon={faSearch} /> Get Books
                </button>
              </div>
            </form>
          </div>
        </div>

        {items.length ? (
          <div>
            <h6 className="sticky text-right mr-5">
              <a href="#top-bar">
                <span className="badge badge-warning">Search Again</span>
              </a>
            </h6>
            <h4 className="mb-5 text-center">
              Displaying results for "{this.state.searchWord}"
            </h4>
            <div id="bookshelf" className="container mt-3">
              {items.map((shelf) => (
                <div className="row justify-content-center shelf">
                  {shelf.map((book) => (
                    <Book
                      imgUrl={book.volumeInfo.imageLinks}
                      title={book.volumeInfo.title}
                      authors={book.volumeInfo.authors}
                      publisher={book.volumeInfo.publisher}
                      info={book.volumeInfo.infoLink}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h4 className="text-center">No Books to Display Yet</h4>
        )}

        <Footer />
      </div>
    );
  }
}

export default App;
