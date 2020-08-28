var express = require('express');
var router = express.Router();

var stocksService = require('../controllers/stocks');

// Routes related to stocks

// Lo siento mucho, pero no he podido acabar con el proyecto, he tenido dificultades con sqlite3
router.get("/:symbol/trades", async (req,res) => {
    var symbol = req.params.symbol;
    var type = req.params.type;
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;

    var data = await stocksService.getStocksByTrades(symbol,type);

    if(data.rows.length == 0){
        res.sendStatus(404);
    }else{

        res.send(data.rows);
    }
});

router.get("/:symbol/prices",async (req,res) => {
    var symbol = req.params.symbol;
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;

    var data = await stocksService.getStocksByPriceDiff(symbol);

    var unixStart = new Date(startDate).getTime() / 1000
    var unixEnd = new Date(endDate).getTime() / 1000

    if(data.rows.length == 0){
        res.sendStatus(404);
    }else{

        var result = [];

        for(var item of data.rows){
        
            var unix = item.timestamp;
    
            if(unixStart < unix && unix < unixEnd){
                result.push(item);
            }
            
        }

        result.sort((a,b) => {return b.price - a.price})

        res.send(result);
    }
});

module.exports = router;