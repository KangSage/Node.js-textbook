// 이벤트 리스너로 잡아내서 프로세스는 멈추지 않음
// 그러나 node.js는 uncaughtException 이벤트 발생 후 다음 동작의 보증을 하지 않음.
process.on("uncaughtException", (err) => {
  console.log("예기치 못한 에러", err);
});

setInterval(() => {
  throw new Error("서버를 고장내주마!");
}, 1000);

// 실행되지 않는다
setTimeout(() => {
  console.log("실행됩니다");
}, 2000);
