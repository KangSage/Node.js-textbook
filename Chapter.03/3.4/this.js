console.log(this);
console.log(this === module.exports);
console.log(this === exports);
function whatIsThis() {
  console.log('function', this === exports, this === global);
}
whatIsThis();

// 최상위 스코프의 this는 module.exports를 가리킨다.
// 함수 선언문 내부의 this는 global 객체를 가리킨다.

