const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks');

dotenv.config();

const indexRouter = require('./routes'); // index.js는 생략 가능
const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 3000);

// set view engine
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// set nunjucks
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

// morgan - 로깅 정책 개발 환경: dev, 배포 환경: combined 그 외: common, short, tiny
app.use(morgan('dev'));

// static 미들웨어는 정적 파일 제공 라우터 역할
app.use('/', express.static(path.join(__dirname, 'public')));

// body-parser 사용법: express 4.16.0부터 내장됨.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// buffer를 사용하는 raw와 text 파일을 읽는 text에
// body-parser를 사용할 경우
app.use(bodyParser.raw());
app.use(bodyParser.text());

// express에도 내장된 것으로 보이나 확인 필요
// app.use(express.raw());
// app.use(express.text());

// cookie-parser: 요청에 동봉된 쿠키를 넣어준 키를 가지고 해석해 res.cookies 객체로 변환
app.use(cookieParser(process.env.COOKIE_SECRET));

// express-session 1.5 버전 이전에는 내부적으로 cookie-parser를
// 사용하여 뒤에 와야했으나 현재는 상관 없음.
app.use(
  session({
    // 세션 수정 사항이 생기지 않더라도 재저장 여부
    resave: false,
    // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 여부
    saveUninitialized: false,
    // 세션 관리용 쿠키의 서명 값: cookie-parser에 넣은 키와 같은 걸 사용
    secret: process.env.COOKIE_SECRET,
    cookie: {
      // 클라이언트에서 확인 불가
      httpOnly: true,
      // https 여부
      secure: false,
    },
    // 세션 쿠키의 이름 - 기본 값은 connect.sid
    name: 'session-cookie',
    // 세션 클러스터링용 저장소 설정
    // store:
  })
);

app.use('/', indexRouter);
app.use('/user', userRouter);

app
  .route('/abc')
  .get((req, res) => {
    res.send('GET /abc');
  })
  .post((req, res) => {
    res.send('POST /abc');
  });

// 일치하는 라우터가 없을 때 404 에러 코드를 응답
// app.use((req, res, next) => {
//   res.status(404).send('Not Found');
// });

// nunjucks로 에러 처리
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// uploads Dir 체크
try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('%o', error);
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

// multer 설정
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// case of single upload
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file, req.body);
  res.send('ok');
});

// case of multiple input
app.post('/multiple-upload', upload.array('many'), (req, res) => {
  console.log(req.files, req.body);
  res.send('ok');
});

// case of multiple fields
app.post(
  '/multi-fields-upload',
  upload.fields([{ name: 'image1' }, { name: 'image2' }]),
  (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
  }
);

// case of none
app.post(
  '/multi-fields-upload',
  upload.fields([{ name: 'image1' }, { name: 'image2' }]),
  (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
  }
);

app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
});

app.get(
  '/',
  (req, res, next) => {
    // res.send('Hello, Express');
    // 쿠키 생성
    res.cookie('name', 'zerocho', {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      secure: true,
    });
    // 쿠키 삭제
    res.clearCookie('name', 'zerocho', {
      httpOnly: true,
      secure: true,
      signed: true,
    });
    console.log('GET / 요청에서만 실행됩니다.');
    next();
  },
  (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
  }
);

app.use((err, req, res, next) => {
  console.error(err);
  req.session.name = 'KangSage';
  console.log(req.sessionID);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
