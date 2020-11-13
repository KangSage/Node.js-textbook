const fs = require('fs').promises;

// node 8.5 이후 제공되는 파일 복사 메서드

fs.copyFile('readme4.txt', 'writeme4.txt')
  .then(() => {
    console.log('복사 완료');
  })
  .catch((error) => {
    console.error(error);
  })
