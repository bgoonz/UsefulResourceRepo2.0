const http = require('http');
const { statSync, readFileSync, createReadStream } = require('fs');
const { join, extname, basename } = require('path');
const { networkInterfaces } = require('os');

const port = 3000;
const cwd = join(__dirname, 'dist');
const defaultFile = join(cwd, 'index.html');
const maxAge = 24 * 3600;
const mimeTypes = {
	svg: 'image/svg+xml',
	png: 'image/png',
	jpg: 'image/jpeg',
	js: 'text/javascript',
	css: 'text/css',
	html: 'text/html',
	woff2: 'application/woff2',
}

const ifaces = networkInterfaces();

const server = http.createServer((req, res) => {
	const url = req.url.split('/').filter(segment => segment !== '');
	const filename = url[url.length - 1];

	if (url.length === 0) {
		url.push('index.html');
	}

	let filepath = join(cwd, ...url);

	res.setHeader('Cache-Control', `public, max-age=${maxAge}`);

	try {
		const stats = statSync(filepath);

		if (stats.isFile()) {
			const mime = mimeTypes[extname(filepath).replace('.', '')] || 'text/plain';
			res.setHeader('Content-Type', mime);
			res.statusCode = 200;

			const readStream = createReadStream(filepath);

			readStream.on('open', () => readStream.pipe(res));
			readStream.on('error', err => res.end(err));

			return;
		}
	} catch (statError) {
		if (extname(filepath) === '') {
			// probably a directory, serve index

			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/html');

			const readStream = createReadStream(defaultFile);

			readStream.on('open', () => readStream.pipe(res));
			readStream.on('error', err => res.end(err));

			return;
		}

		// Missing file, serve 404
		res.statusCode = 404;
		res.end();

		return;
	}
});

server.listen(port);

Object.values(ifaces).forEach((dev) => {
	dev.forEach((details) => {
		if (details.family === 'IPv4') {
			console.log(`Serving on ${details.address}:${port}`);
		}
	});
});
