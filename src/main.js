import peer from './peer'

await new Promise(resolve => peer.on('open', resolve))

let [,cid] = location.hash.match(/#([\w-]+)/) || []
if(!cid) {
    location.replace(`${location.pathname+location.search}#${peer._id}`);
}else if(cid !== peer._id){
    const conn = peer.connect(cid);
    conn.on("open", () => {
        console.error('open');
        conn.send("hi!");
    });
    conn.on("data", (data) => {
        // Will print 'hi!'
        console.log('data', data);
    });
}

import update from './update.js';

// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules
console.log('if you have sourcemaps enabled in your devtools, click on main.js:5 -->');

update();