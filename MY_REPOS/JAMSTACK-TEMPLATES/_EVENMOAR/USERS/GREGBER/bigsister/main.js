require.config({
  baseUrl: "/client",
  paths: {
    templates: "../templates",
    backbone: "/components/backbone/backbone",
    jquery: "/components/jquery/jquery",
		sigma: "/components/sigma/sigma",
    underscore: "/components/underscore/underscore",
    text: "/components/requirejs-text/text",
    hogan: "/components/hogan/web/builds/2.0.0/hogan-2.0.0.amd"
  },
  shim: {
    backbone: {
      deps: [
      "underscore",
      "jquery"
      ],
      exports: "Backbone"
    },
    underscore: {
      exports: "_"
    }
  }
});

require(["app"]);