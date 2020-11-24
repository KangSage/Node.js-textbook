const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
  // res.send('Hello, Express');
  // res.render('index', { title: 'Express' });
  res.locals.title = 'Express';
  res.render('index');
});

module.exports = router;
