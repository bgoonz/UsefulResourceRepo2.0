const raw = require('raw-socket');
const ip = require('ip');

var options = {
	protocol: raw.Protocol.ICMP
};

const sourceIp = '127.0.0.1';
const targetIp = '127.0.0.1';

var socket = raw.createSocket(options);

socket.setOption(raw.SocketLevel.IPPROTO_IP, raw.SocketOption.IP_HDRINCL,
	Buffer.from([0x00, 0x00, 0x00, 0x01]), 4);

socket.on('close', function onClose() {
	console.log('socket closed');
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(-1);
});

socket.on('error', function onError(error) {
	console.log('error: ' + error.toString());
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(-1);
});

socket.on('message', function onMessage(buffer, source) {
	console.log('received ' + buffer.length + ' bytes from ' + source);
	console.log('data: ' + buffer.toString('hex'));
});

// ICMP echo (ping) request (the source IP address used may not match yours)
var buffer = Buffer.from([
	0x45, 0x00, 0x00, 0x3C, 0x7C, 0x9B, 0x00, 0x00,
	0x80, 0x01, 0x39, 0x8E, 0xC0, 0xA8, 0x48, 0x53,
	0xC0, 0xA8, 0x41, 0x01, 0x08, 0x00, 0x43, 0x52,
	0x00, 0x01, 0x0A, 0x09, 0x61, 0x62, 0x63, 0x64,
	0x65, 0x66, 0x67, 0x68, 0x69, 0x6A, 0x6B, 0x6C,
	0x6D, 0x6E, 0x6F, 0x70, 0x71, 0x72, 0x73, 0x74,
	0x75, 0x76, 0x77, 0x61, 0x62, 0x63, 0x64, 0x65,
	0x66, 0x67, 0x68, 0x69]);

ip.toBuffer(sourceIp, buffer, 12); // IP: save ip src (src_ip var) into the buffer
ip.toBuffer(targetIp, buffer, 16); // IP: save ip src (src_ip var) into the buffer

buffer.writeUInt16BE(parseInt(Math.random() * 0xFFFF, 10), 4); // IP: set identification
buffer.writeUInt16LE(buffer.length, 2);

function ping() {
	socket.send(buffer, 0, buffer.length, targetIp, function onSend(error, bytes) {
		if (error) {
			console.log(error.toString());
		} else {
			console.log('sent ' + bytes + ' bytes to ' + targetIp);
		}
	});

	setTimeout(ping, 1000);
}

ping();