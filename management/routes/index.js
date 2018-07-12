var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '商品添加' });
});
router.get('/list', function(req, res, next) {
  res.render('list', { title: '商品列表' });
});

module.exports = router;
