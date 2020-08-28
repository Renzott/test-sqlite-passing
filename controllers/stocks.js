let db = require('../database/sqlite');

const getStocksByTrades = async (symbol,type) => {
    var sql  = 'Select * from operation where symbol = ? and type = ?'

    var param = [symbol,type]

    var result = await db.query(sql,param, (err) => {
        if(err){
            return [];
        }
    });

    return result;
}

const getStocksByPriceDiff = async (symbol) =>{
    var sql  = 'Select * from operation where symbol = ?'

    var param = [symbol]

    var result = await db.query(sql,param, (err) => {
        if(err){
            return [];
        }
    });

    return result;
}


module.exports = {
    getStocksByPriceDiff,
    getStocksByTrades,
}