const fs = require('fs');

// 파일 내용 수정 시 change 이벤트 발생, 파일명 변경 or 삭제시 rename
fs.watch('./target.txt', (eventType, filename) => {
  console.log(eventType, filename);
});

