'use strict'

//module.exports = require('require-directory')(module, { exclude: /helpers\.js$/ })

module.exports = {
	'c': {
		'index': require('./c/index.js'),
		'info': require('./c/info.js'),
		'libcurl': require('./c/libcurl.js')
	},
	'csharp': {
		'index': require('./csharp/index.js'),
		'info': require('./csharp/info.js'),
		'restsharp': require('./csharp/restsharp.js')
	},
	'go': {
		'index': require('./go/index.js'),
		'info': require('./go/info.js'),
		'native': require('./go/native.js')
	},
	'java': {
		'index': require('./java/index.js'),
		'info': require('./java/info.js'),
		'okhttp': require('./java/okhttp.js'),
		'unirest': require('./java/unirest.js')
	},
	'javascript': {
		'index': require('./javascript/index.js'),
		'info': require('./javascript/info.js'),
		'jquery': require('./javascript/jquery.js'),
		'xhr': require('./javascript/xhr.js')
	},
	'node': {
		'index': require('./node/index.js'),
		'info': require('./node/info.js'),
		'native': require('./node/native.js'),
		'request': require('./node/request.js'),
		'unirest': require('./node/unirest.js')
	},
	'objc': {
		'index': require('./objc/index.js'),
		'info': require('./objc/info.js'),
		'nsurlsession': require('./objc/nsurlsession.js')
	},
	'ocaml': {
		'index': require('./ocaml/index.js'),
		'info': require('./ocaml/info.js'),
		'cohttp': require('./ocaml/cohttp.js')
	},
	'php': {
		'index': require('./php/index.js'),
		'info': require('./php/info.js'),
		'http1': require('./php/http1.js'),
		'http2': require('./php/http2.js'),
		'curl': require('./php/curl.js')
	},
	'python': {
		'index': require('./python/index.js'),
		'info': require('./python/info.js'),
		'python3': require('./python/python3.js'),
		'requests': require('./python/requests.js')
	},
	'ruby': {
		'index': require('./ruby/index.js'),
		'info': require('./ruby/info.js'),
		'native': require('./ruby/native.js')
	},
	'shell': {
		'index': require('./shell/index.js'),
		'info': require('./shell/info.js'),
		'wget': require('./shell/wget.js'),
		'httpie': require('./shell/httpie.js'),
		'curl': require('./shell/curl.js')
	},
	'swift': {
		'index': require('./swift/index.js'),
		'info': require('./swift/info.js'),
		'nsurlsession': require('./swift/nsurlsession.js')
	},

}
