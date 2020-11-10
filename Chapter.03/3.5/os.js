const os = require('os');

console.log('운영체제 정보---------------------------------');
console.log('os.arch()', os.arch());
console.log('os.platform(): %o', os.platform());
console.log('os.type(): %o', os.type());
console.log('os.uptime(): %o', os.uptime());
console.log('os.hostname(): %o', os.hostname());
console.log('os.release(): %o', os.release());

console.log('경로------------------------------------------');
console.log('os.homedir(): %o', os.homedir());
console.log('os.tmpdir(): %o', os.tmpdir());

console.log('cpu 정보--------------------------------------');
console.log('os.cpus(): %o', os.cpus());
console.log('os.cpus().length: %o', os.cpus().length);

console.log('메모리 정보-----------------------------------');
console.log('os.freemem(): %o', os.freemem());
console.log('os.totalmem(): %o', os.totalmem());
