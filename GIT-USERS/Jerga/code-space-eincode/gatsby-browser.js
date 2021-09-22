import React from "react";
import RootLayout from "./src/components/RooLayout";

export const wrapRootElement = ({ element }) => (
  <RootLayout>{element}</RootLayout>
);
