let database = require('../database/sqlite');

const addTrades = async (item) => {

    var db = await database;

    var user = item.user;

    var temp = item;
    temp.user = user.id;

    var operation = temp;

    try {

        var sql_1 = 'INSERT INTO user (id, name) VALUES (?,?)'
        var sql_2 = 'INSERT INTO operation (id,type,idUser,symbol,shares,price,timestamp) VALUES (?,?,?,?,?,?,?)'

        await db.run(sql_1, Object.values(user));
        await db.run(sql_2, Object.values(operation));

        return true;
    } catch (e) {
        return false;
    }

}

const deleteTrades = async () => {

    var db = await database;

    var sql = 'DELETE FROM operation';
    var result = await db.run(sql);

    var sql1 = 'DELETE FROM user';
    var result = await db.run(sql1);

    return result;
}

const getAllTrades = async () => {

    var db = await database;

    var sql = 'Select * from operation'

    var array = await db.all(sql);

    var data = [];

    for (let item of array) {
        var sql1 = 'Select * from user where id = ?'

        var user = await db.all(sql1, item.idUser);
        delete item.idUser;
        item.user = user[0];
        data.push(item);
    }

    return data;
}

const getTradeByID = async (idUser) => {

    var db = await database;

    var sql = 'Select * from operation where idUser = ?'

    var param = idUser;
    var array = await db.all(sql, param);

    var data = [];

    for (let item of array) {
        var sql1 = 'Select * from user where id = ?'

        var user = await db.all(sql1, item.idUser);
        delete item.idUser;
        item.user = user[0];
        data.push(item);
    }

    return data;
}


module.exports = {
    addTrades,
    deleteTrades,
    getAllTrades,
    getTradeByID
}
