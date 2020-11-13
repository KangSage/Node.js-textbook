const fs = require("fs");

setInterval(() => {
  // 존재 하지 않는 파일을 삭제하려 할 때 에러 발생
  fs.unlink("./abcdefg.js", (err) => {
    if (err) {
      console.error(err);
    }
  });
}, 1000);
