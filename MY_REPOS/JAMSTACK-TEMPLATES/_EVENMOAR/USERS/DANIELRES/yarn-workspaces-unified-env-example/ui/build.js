import Bundler from "parcel-bundler";

const bundler = new Bundler("src/index.html", {
  cache: false,
  autoInstall: false,
  watch: false,
  scopeHoist: true, // tree-shaking (experimental )
  minify: true,
  detailedReport: true
});

bundler.bundle();
