var express = require('express');
var router = express.Router();

var tradeService = require('../controllers/trades');

// Routes related to trades

router.get('/', async (req, res) => {
    var data = await tradeService.getAllTrades();
    var result = data.sort((a,b) => a.id - b.id);
    res.send(result);
});

router.post('/', async (req,res) =>{
    var trade = req.body;
    var result = await tradeService.addTrades(trade);
    if(result){
        res.sendStatus(201)
    }else{
        res.sendStatus(400);
    }
});

router.get('/users/:userID', async (req,res) => {
    var userID = req.params.userID;
    var data = await tradeService.getTradeByID(userID);
    if(data.length != 0){
        res.send(data);
    }else{
        res.sendStatus(404)
    }
        
})

module.exports = router;