const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server</p>');
})
  // 클라이언트에 공개할 포트번호, 포트 번호 연 후 실행될 콜백 함수
  .listen(8080, () => { // 서버 연결
    console.log('8080번 포트에서 서버 대기중입니다!');
  });
