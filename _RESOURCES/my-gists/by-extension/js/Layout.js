import * as React from "react";
import Footer from "./footer";
// Header is reserved
import AppHeader from "./appHeader";

export default function Layout({ children, seo }) {
  return (
    <div className="container is-max-desktop">
      <AppHeader seo={seo} />
      {children}
      <Footer />
    </div>
  );
}
