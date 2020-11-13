const fs = require('fs').promises;
const constants = require('fs').constants;
  // 디렉토리나 파일에 접근 할 수 있는지 체크
  // 2번째 파라미터로 넣어주는 상수로 조건 체크
  // F_OK : 파일 존재 여부, R_OK : 읽기 권한 여부, W_OK : 쓰기 권한 여부
fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
  .then(() => {
    return Promise.reject('이미 폴더 있음')
  })
  .catch((err) => {
    if (err.code === 'ENOENT') {
      console.log('폴더 없음');
      // 디렉토리를 만드는 메서드
      return fs.mkdir('./folder');
    }
    return Promise.reject(err);
  })
  .then(() => {
    console.log('폴더 만들기 성공');
    // 파일의 아이디(fd 변수)를 가져오는 메서드
    // 없으면 생성 후 가져옴 flag에 따라 동작이 변함
    return fs.open('./folder/file.js', 'w');
  })
  .then((fd) => {
    console.log('빈 파일 만들기 성공', fd);
    // 파일 이름을 바꾸는 메서드
    // 기존 위치와 새로운 위치를 적는다. 잘라내기처럼 사용 가능
    fs.rename('./folder/file.js', './folder/newfile.js');
  })
  .then(() => {
    console.log('이름 바꾸기 성공');
  })
  .catch((err) => {
    console.error(err)
  })
