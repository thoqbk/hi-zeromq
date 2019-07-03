const zmq = require('zeromq');
const fs = require('fs');
const path = require('path');
const rep = zmq.socket('rep');

rep.on('message', buffer => {
    const filenameLength = buffer.readInt32LE(0);
    const filename = buffer.toString('utf8', 4, 4 + filenameLength);
    const wstream = fs.createWriteStream(path.join('./upload', filename));

    const content = buffer.subarray(4 + filenameLength);
    wstream.write(content);
    wstream.end();
    
    const message = `Wrote file ${filename} to upload folder. Length: ${content.length}`;
    console.log(message);

    rep.send(message);
});

rep.bindSync('tcp://127.0.0.1:3000');
