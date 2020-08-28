let database = require('../database/sqlite');

const getStocksByTrades = async (symbol, type) => {

    var db = await database;
    var sql = 'Select * from operation where symbol = ? and type = ?'

    var array = await db.all(sql, [symbol, type]);

    var sql2 = 'Select distinct symbol from operation where symbol = ?';
    var result2 = await db.all(sql2, [symbol]);

    if (result2.length != 0) {

        var data = [];

        for (let item of array) {
            var sql1 = 'Select * from user where id = ?'

            var user = await db.all(sql1, item.idUser);
            delete item.idUser;
            item.user = user[0];
            data.push(item);
        }

        return data;
    } else {
        return null;
    }


}

const getStocksByPriceDiff = async (symbol) => {

    var db = await database;

    var sql = 'Select * from operation where symbol = ?';

    var result = await db.all(sql, symbol);

    return result;
}


module.exports = {
    getStocksByPriceDiff,
    getStocksByTrades,
}