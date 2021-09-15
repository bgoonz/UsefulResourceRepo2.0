require("babel-core/register")({
  presets: [
    [
      "babel-preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "flow",
  ],
});
