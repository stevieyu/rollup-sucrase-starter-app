import {Peer} from "peerjs";

let fpVisitorId = sessionStorage.getItem('fpVisitorId')
if(!fpVisitorId) {
    console.log(fpVisitorId);
//    const fingerprintjs = await import('https://openfpcdn.io/fingerprintjs/v3')
    const fingerprintjs = await import('https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3.3.6/dist/fp.esm.js/+esm')
    fpVisitorId = (await (await fingerprintjs.load()).get()).visitorId
    sessionStorage.setItem('fpVisitorId', fpVisitorId)
}

const peer = new Peer(fpVisitorId, {
	debug: 2,
	// host: '127.0.0.1',
	// port: 9000,
	// path: '/myapp',
	// key: 'peerjs',
	pingInterval: 60000
});

peer.on("connection", (conn) => {
	console.error('connection');
	conn.on("data", (data) => {
		// Will print 'hi!'
		console.log('data', data);
	});
	conn.on("open", () => {
		console.error('connection open');
		conn.send("hello!");
	});
});

peer.on("error", (error) => {
	console.error(error)
})

export default peer