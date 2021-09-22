import GlobalState from "./context/globalState";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/app.css";

function App() {
  return (
    <GlobalState>
      <Route exact path="/">
        <Home />
      </Route>
    </GlobalState>
  );
}

export default App;
