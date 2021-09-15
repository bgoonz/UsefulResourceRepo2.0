import React, { Component } from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
// movie data that we use in this app
import { movies } from './MovieData';

const MAIN_STYLE = {
  border: '3px solid black'
};

const NAV_STYLE = { border: '2px solid red', padding: '10px', margin: '10px' };

const BLACK_STYLE = {
  border: '1px solid black',
  margin: '10px',
  padding: '10px'
};

const ORANGE_STYLE = {
  border: '1px solid orange',
  margin: '10px',
  padding: '10px'
};

const Admin = (props) => (
  <div style={BLACK_STYLE}>
    <h1>Hi {props.name}! Welcome to Admin</h1>
  </div>
);

const NotAdmin = (props) => (
  <div style={BLACK_STYLE}>
    <h1>Hi {props.name}! You Are Not Authorized</h1>
    <button onClick={() => props.history.push('/')}>Home</button>
  </div>
);

const PageNotFound = () => {
  return (
    <div style={BLACK_STYLE}>
      <h1>Page not found</h1>
    </div>
  );
};

const Home = () => (
  <div style={ORANGE_STYLE}>
    <h1>Home</h1>
  </div>
);

const Stocks = (props) => {
  return (
    <div style={ORANGE_STYLE}>
      <h1>Stocks</h1>
      <button onClick={() => props.history.push('/')}>Home</button>
    </div>
  );
};

const Movies = (props) => {
  return (
    <div style={ORANGE_STYLE}>
      <h1>Movies</h1>
      <nav>
        {/* create NavLinks for each movie title */}
        {movies.map((movie) => (
          <NavLink
            activeStyle={{ color: 'red', fontStyle: 'italic' }}
            key={movie.id}
            to={`${props.match.url}/${movie.id}`}
          >
            {movie.title}
          </NavLink>
        ))}
      </nav>

      {/* Use parameters to pass the id to MovieDetail */}
      <Route exact path={`${props.match.path}/:id`} component={MovieDetail} />
    </div>
  );
};

const MovieDetail = (props) => {
  // using the parameter find the id in the array of movies the corresponds and place object value in the variable
  const movie = movies.find(
    (movie) => parseInt(props.match.params.id) === parseInt(movie.id)
  );

  // if there is no movie redirect back to HOME
  if (!movie) {
    return <Redirect to="/" />;
  }

  return (
    <div
      style={{ border: '1px solid purple', margin: '10px', padding: '10px' }}
    >
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
    </div>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthorized: true,
      name: 'JD'
    };
  }

  render() {
    return (
      <div style={MAIN_STYLE}>
        <nav style={NAV_STYLE}>
          {/* full page reload */}
          <a href="/">Home Anchor</a>

          {/* page does not reload */}
          {/* Links and NavLink create an anchor tag on the DOM */}
          {/* <Link to="/">Home</Link>
          <Link to="/stocks">Stocks</Link>
          <Link to="/movies">Movies</Link> */}

          {/* activeClassName activeStyle exact props come with NavLink*/}
          <NavLink exact activeClassName="is-active" to="/">
            Home
          </NavLink>
          <NavLink activeClassName="is-active" to="/stocks">
            Stocks
          </NavLink>
          <NavLink activeClassName="is-active" to="/movies">
            Movies
          </NavLink>
          <NavLink activeClassName="is-active" to="/admin">
            Admin
          </NavLink>
        </nav>
        <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/stocks" component={Stocks} />
            <Route path="/movies" component={Movies} />

            {/* pass props to the component using render props pattern */}
            <Route
              path="/admin"
              render={(props) =>
                this.state.isAuthorized ? (
                  <Admin name={this.state.name} />
                ) : (
                  <NotAdmin name={this.state.name} {...props} />
                )
              }
            />
            {/* <Route path="/admin" component={Admin} /> */}
            <Route path="/not-admin" component={NotAdmin} />
            {/* default to this route if no other route is found above this one */}
            <Route path="*" component={PageNotFound} />
          </Switch>
        </>
      </div>
    );
  }
}

export default App;
