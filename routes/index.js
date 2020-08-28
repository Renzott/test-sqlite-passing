var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {

  res.render('index', { title: "result" });
});

module.exports = router;
