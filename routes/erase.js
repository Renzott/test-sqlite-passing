var express = require('express');
var router = express.Router();

var tradeService = require('../controllers/trades');

// Route to delete all trades

router.delete('/', async (req, res) => {
    await tradeService.deleteTrades();
    res.sendStatus(200);
  });
  

module.exports = router;
