const EventEmitter = require('events');

const myEvent = new EventEmitter();

// 이벤트 이름과 이벤트 발생 시의 콜백을 연결
myEvent.addListener('event1', () => {
  console.log('이벤트 1');
});
// addListener와 같음
myEvent.on('event2', () => {
  console.log('이벤트 2');
});
myEvent.on('event2', () => {
  console.log('이벤트 2 추가');
});

// 한 번만 실행될 이벤트 등
myEvent.once('event3', () => {
  console.log('이벤트 3');
});

// 이벤트 호출 메서드
myEvent.emit('event1'); // 이벤트 호출
myEvent.emit('event2'); // 이벤트 호출

myEvent.emit('event3'); // 이벤트 호출
myEvent.emit('event3'); // 실행 안됨

myEvent.on('event4', () => {
  console.log('이벤트 4');
});

// 모든 이벤트 리스너 제거
myEvent.removeAllListeners('event4');
myEvent.emit('event4'); // 실행 안됨

const listener = () => {
  console.log('이벤트 5');
};
myEvent.on('event5', listener);
// 특정 리스너를 제거 - 제거할 리스너를 반드시 넣어줘야함
myEvent.removeListener('event5', listener);
myEvent.emit('event5'); // 실행 안 됨

// 이벤트에 연결된 리스너 갯수 확인
console.log(myEvent.listenerCount('event2'));
