var express = require('express');
var router = express.Router();

var tradeService = require('../controllers/trades');

// Routes related to trades

router.get('/', async (req, res) => {
    var data = await tradeService.getAllTrades();
    res.send(data.rows);
});

router.post('/', async (req,res) =>{
    var trade = req.body;
    var data = await tradeService.addTrades(trade);
    if(result){
        res.statusCode = 201;
        var result = data.rows.sort((a,b) => a.id - b.id);
        res.send(result);
    }else{
        res.sendStatus(400);
    }
});

router.get('/trades/user/:userID', async (req,res) => {
    var userID = req.params.userID;
    var data = await tradeService.getTradeByID(userID);
    if(data.rows.length == 0){
        res.sendStatus(404);
    }else{
        res.statusCode = 200;
        var result = data.rows.sort((a,b) => a.id - b.id);
        res.send(result);
    }
})

module.exports = router;