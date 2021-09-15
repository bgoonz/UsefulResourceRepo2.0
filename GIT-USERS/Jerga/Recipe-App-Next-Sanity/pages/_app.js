import "styles/globals.css";
import { useState } from "react";
import Router from "next/router";
import Navbar from "components/Navbar";
import Loader from "components/Loader";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
