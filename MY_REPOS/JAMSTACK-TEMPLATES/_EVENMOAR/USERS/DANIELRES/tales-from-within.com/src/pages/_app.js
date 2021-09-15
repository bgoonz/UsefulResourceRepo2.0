import { Bg } from "../components/Bg";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="relative z-0">
        <Bg />
      </div>

      <div className="relative z-10">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
