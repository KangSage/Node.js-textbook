const fs = require('fs').promises;

setInterval(() => {
  // 프로미스의 에러는 catch하지 않아도 알아서 처리되지만
  // node.js 버전에 따라 동작이 달라질 수 있으므로 catch를 반드시 해주는 것을 권장
  fs.unlink('./abcdefg.js');
}, 1000);
