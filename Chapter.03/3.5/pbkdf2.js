const crypto = require('crypto');

// randomBytes와 pdkdf2 메서드는 스레드풀을 사용하여 멀티 스레딩으로 동작하므로 블로킹 걱정 없음.
crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64');
  console.log('salt:', salt);
  crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
    console.log('password', key.toString('base64'));
  })
})
