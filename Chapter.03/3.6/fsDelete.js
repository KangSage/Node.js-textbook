const fs = require('fs').promises;

  // 폴더 안의 내용물 확인 - 배열 안에 내부 파일과 폴더명
fs.readdir('./folder')
  .then((dir) => {
    console.log('폴더 내용 확인', dir);
          // 파일 삭제 - 파일이 없으면 에러! 파일 존재 여부 체크
    return fs.unlink('./folder/newFile.js');
  })
  .then(() => {
    console.log('파일 삭제 성공');
          // 폴더 삭제 - 내부 파일이 존재 하면 에러! 모두 지우고 호출
    return fs.rmdir('./folder');
  })
  .then(() => {
    console.log('폴더 삭제 성공');
  })
  .catch((err) => {
    console.error(err);
  })
