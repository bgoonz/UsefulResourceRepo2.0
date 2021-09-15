const mocha = new Mocha({
  reporter: "mochawesome",
  reporterOptions: {
    overwrite: true,
    reportTitle: "My Custom Title",
    showPassed: false,
  },
});
