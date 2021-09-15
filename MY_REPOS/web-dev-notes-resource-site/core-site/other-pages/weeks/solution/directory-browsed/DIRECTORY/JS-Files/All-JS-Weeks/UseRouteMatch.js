import {
  Route,
  BrowserRouter as Router,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';

function Profile() {
  const match = useRouteMatch('/profile/:name');

  return match ? <p>{match.params.name}'s Profile</p> : <p>My own profile</p>;
}

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/profile">JD Profile</Link>
        <br />
        <Link to={`/profile/ann`}>Ian Profile</Link>
      </nav>
      <Route path="/profile">
        <Profile />
      </Route>
    </Router>
  );
}
