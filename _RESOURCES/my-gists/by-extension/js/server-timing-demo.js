// see for screenshot:
//     https://twitter.com/paul_irish/status/829090506084749312 

const http = require('http');

function requestHandler(request, response) {
	const headers = {
		'Server-Timing': `
		  sql-1;desc="MySQL lookup Server";dur=100,
		  sql-2;dur=900;desc="MySQL shard Server #1",
	      fs;dur=600;desc="FileSystem",
	      cache;dur=300;desc="Cache",
		  other;dur=200;desc="Database Write",
		  other;dur=110;desc="Database Read",
		  cpu;dur=1230;desc="Total CPU"
		`.replace(/\n/g, '')


	};

	response.writeHead(200, headers);
	response.write('');
	return setTimeout(_ => {
		response.end();
	}, 1230)
}

http.createServer(requestHandler)
	.listen(8082)
	.on('error', console.error);
