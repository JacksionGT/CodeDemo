const fs = require('fs');
const res = fs.readFileSync('test.txt');
console.log(JSON.stringify(res));

const str = 'e4 b8 ad e5 8d 8e e4 ba ba e6 b0 91 e5 85 b1 e5 92 8c e5 9b bd';
const data = str.trim().split(/[\s\r\n]+/g).map(s => parseInt(s,16));
const dataBinary = Buffer.from([228,184,173,229,141,142,228,186,186,230,176,145,229,133,177,229,146,140,229,155,189])
const txt = dataBinary.toString()
console.log(txt);