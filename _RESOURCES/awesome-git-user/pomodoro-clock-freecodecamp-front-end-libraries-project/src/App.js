import Header from "./components/header";
import ClockBody from "./components/clockbody";
import Footer from "./components/footer";
import "fontsource-courgette";
import "fontsource-share-tech-mono";
import "./styles/app.css";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-main">
        <ClockBody />
      </div>
      <Footer />
    </div>
  );
}

export default App;
