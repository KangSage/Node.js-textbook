/**
 * @author KangSage <ksage@knou.ac.kr>
 * @type { Socket }
 */

const SocketIO = require('socket.io');
const axios = require('axios');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookie = require('cookie-signature');

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' });

  // 라우터에서 io 객체를 쓸 수 있게 저장
  app.set('io', io);
  // of 메서드로 네임 스페이스를 부여
  const room = io.of('/room');
  const chat = io.of('/chat');

  // io.use 메서드에 미들웨어를 장착할 수 있다.
  // 웹 소켓 연결 시 마다 실행됨
  io.use((socket, next) => {
    cookieParser(process.env.COOKIE_SECRET)(
      socket.request,
      socket.request.res,
      next,
    );
    // socket.request.session 객체가 생성된다
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  // /room 네임 스페이스에 이벤트 리스너를 등록
  room.on('connection', socket => {
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제');
    });
  });

  // /chat 네임 스페이스에 이벤트 리스너를 등록
  chat.on('connection', socket => {
    console.log('chat 네임스페이스에 접속');
    const req = socket.request;
    const {
      headers: { referer },
    } = req;
    const roomId = referer
      .split('/')
      [referer.split('/').length - 1].replace(/\?.+/, '');
    // room에 접속
    socket.join(roomId);
    // socket.to(방 아이디) 메서드로 특정 방에 데이터를 보낼 수 있다
    socket.to(roomId).emit('join', {
      user: 'system',
      // 위에서 미들웨어를 연결했으므로 웹 소켓에서 세션을 사용할 수 있다.
      chat: `${req.session.color}님이 입장하셨습니다.`,
    });

    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
      // room을 떠남
      socket.leave(roomId);
      const currentRoom = socket.adapter.rooms[roomId];
      const userCount = currentRoom ? currentRoom.length : 0;
      // 접속자가 0명이면 방 제거
      if (userCount === 0) {
        const signedCookie = cookie.sign(
          req.signedCookies['connect.sid'],
          process.env.COOKIE_SECRET,
        );
        const connectSID = `${signedCookie}`;
        axios
          .delete(`http://localhost:8080/room/${roomId}`, {
            headers: {
              Cookie: `connect.sid=s%3A${connectSID}`,
            },
          })
          .then(() => {
            console.log('방 제거 요청 성공');
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        socket.to(roomId).emit('exit', {
          user: 'system',
          chat: `${req.session.color}님이 퇴장하셨습니다.`,
        });
      }
    });
    socket.on('chat', data => {
      socket.to(data.room).emit(data);
    });
  });
};
