const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt');
const writeSteam = fs.createWriteStream('./big3.txt');

readStream.pipe(writeSteam);
readStream.on('end', () => {
  console.log('stream :', process.memoryUsage().rss);
});
