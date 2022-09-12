import {Peer} from "peerjs";

let fpVisitorId = sessionStorage.getItem('fpVisitorId')
if(!fpVisitorId) {
    fpVisitorId = (await (await (await import('https://openfpcdn.io/fingerprintjs/v3')).load()).get()).visitorId
    sessionStorage.setItem('fpVisitorId', fpVisitorId)
}

const peer = new Peer(fpVisitorId, {
	debug: 3,
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