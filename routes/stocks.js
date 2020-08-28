var express = require('express');
var router = express.Router();

var stocksService = require('../controllers/stocks');

// Routes related to stocks

// Lo siento mucho, pero no he podido acabar con el proyecto, he tenido dificultades con sqlite3
router.get("/:symbol/trades", async (req,res) => {
    var symbol = req.params.symbol;
    var type = req.query.type;
    
    var data = await stocksService.getStocksByTrades(symbol,type);
   
    if(data == null){
        res.sendStatus(404);
    }else{
        
        res.send(data);
    }
});

router.get("/:symbol/price",async (req,res) => {
    var symbol = req.params.symbol;
    var startDate = req.query.start;
    var endDate = req.query.end;

    var data = await stocksService.getStocksByPriceDiff(symbol);

    var unixStart = new Date(startDate).getTime() / 1000
    var unixEnd = new Date(endDate).getTime() / 1000

    if(data.length == 0){
        res.sendStatus(404);
    }else{

        var result = [];

        for(var item of data){
        
            var unix = new Date(item.timestamp).getTime() / 1000;
    
            if(unixStart < unix && unix < unixEnd){
                result.push(item);
            }
            
        }
        result.sort((a,b) => {return b.price - a.price})

        if(result.length == 0){
            res.send({ message: 'There are no trades in the given date range' });
            return;
        }

        var highest = result[0].price;
        var lowest = result[result.length - 1].price

        res.send({ symbol, highest, lowest});
    }
});


module.exports = router;