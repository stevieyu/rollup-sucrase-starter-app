import {Peer} from "peerjs";

let fpVisitorId = sessionStorage.getItem('fpVisitorId')
if(!fpVisitorId) {
    fpVisitorId = (await (await (await import('https://openfpcdn.io/fingerprintjs/v3')).load()).get()).visitorId
    sessionStorage.setItem('fpVisitorId', fpVisitorId)
}

const peer = new Peer(fpVisitorId, {
	debug: 3
});

peer.on("connection", (conn) => {
	console.log('connection');
	conn.on("data", (data) => {
		// Will print 'hi!'
		console.log('data', data);
	});
	conn.on("open", () => {
		console.log('connection open');
		conn.send("hello!");
	});
});

export default peer