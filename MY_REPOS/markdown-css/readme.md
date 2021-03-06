# github-markdown-css

<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="./github-markdown.css">







<article class="markdown-body">
	<h1>Unicorns</h1>
	<p>All the things</p>
</article>

> The minimal amount of CSS to replicate the GitHub Markdown style

[<img src="https://cloud.githubusercontent.com/assets/170270/5219062/f22a978c-7685-11e4-8316-af25b6c89bc0.png" width="300">](http://bgoonz.com/github-markdown-css)

## [Demo](https://bgoonz.com/github-markdown-css)

## Install

> with npm:

```sh
 npm install github-markdown-css
```

## Usage

Import the `github-markdown.css` file and add a `markdown-body` class to the container of your rendered Markdown and set a width for it. GitHub uses `980px` width and `45px` padding, and `15px` padding for mobile.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="github-markdown.css">
<style>
	.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
</style>
<article class="markdown-body">
	<h1>Unicorns</h1>
	<p>All the things</p>
</article>
```

If you want code syntax highlighted, use GitHub Flavored Markdown rendered from [GitHub's `/markdown` API](https://docs.github.com/en/free-pro-team@latest/rest/reference/markdown).

## How

See [`markdown-css`](https://github.com/bgoonz/markdown-css) for how it's generated and ability to generate your own.

## Dev

Run `npm run make` to update the CSS.
