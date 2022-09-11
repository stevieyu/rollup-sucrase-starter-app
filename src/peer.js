import {Peer} from "peerjs";

let fpVisitorId = sessionStorage.getItem('fpVisitorId')
if(!fpVisitorId) {
    fpVisitorId = (await (await (await import('https://openfpcdn.io/fingerprintjs/v3')).load()).get()).visitorId
    sessionStorage.setItem('fpVisitorId', fpVisitorId)
}

const peer = new Peer(fpVisitorId, {
    host: '1.peerjs.com'
});

peer.on("connection", (conn) => {
	conn.on("data", (data) => {
		// Will print 'hi!'
		console.log(data);
	});
	conn.on("open", () => {
		conn.send("hello!");
	});
});

export default peer