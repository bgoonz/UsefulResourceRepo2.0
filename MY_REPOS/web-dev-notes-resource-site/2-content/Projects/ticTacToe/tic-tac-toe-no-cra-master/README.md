# Tic Tac Toe Application

## Created Without Create React App

I created this application so that I could update my **React Workflow** incorporating the latest changes in **Webpack** and **React**. However, two plugins I was using in my previous workflow have vulnerabilities which I cannot resolve at this time. They are:

+ [image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader)
+ [imagemin-webpack-plugin](https://www.npmjs.com/package/imagemin-webpack-plugin)

Purportedly the [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) did not seem to not work well at this point in time with webpack 4 > version 3.0.7. I might revert to it and see what happens. At first the html did not update changes in development or production. However, that might have been because I had not set up my workflow in webpack correctly yet. I now am using 3.2.0 and it works just fine.

The [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701) does not play well with webpack 4. Word is to replace it with the [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/) instead. This works very well.

The **CommonsChunkPlugin** has been removed from `the internal webpack graph`. It has been replaced by `optimization.splitChunks`. To learn more, please visit the webpack docs: [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/).

