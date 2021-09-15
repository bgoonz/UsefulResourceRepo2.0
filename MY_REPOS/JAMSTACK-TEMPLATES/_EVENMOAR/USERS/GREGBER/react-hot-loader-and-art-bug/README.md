To repro:

1. `npm start`
2. Open localhost:8080 in the browser
3. Observe blank page, error messages in console about `Group` not being a valid React element
4. Crtl+C the webpack-dev-server
5. Comment out the `'react-hot-loader/patch',` line in `webpack.config.js`
6. `npm start`
7. Open localhost:8080 in the browser
8. Observe the page renders properly