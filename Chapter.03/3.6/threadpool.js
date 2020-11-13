// 기본 스레드 풀이 4개로 설정되어 있어 4개씩 묶어서 동작함
// CPU 코어 수에 영향 받음

const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('1: ', Date.now() - start);
})

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('2: ', Date.now() - start);
})

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('3: ', Date.now() - start);
})

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('4: ', Date.now() - start);
})

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('5: ', Date.now() - start);
})

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('6: ', Date.now() - start);
})

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('7: ', Date.now() - start);
})

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('8: ', Date.now() - start);
})
