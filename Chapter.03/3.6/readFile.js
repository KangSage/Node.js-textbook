const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data); // readFile의 결과물은 Buffer라는 형식으로 제공됨.
  console.log(data.toString());
})

