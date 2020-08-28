let db = require('../database/sqlite');

const addTrades = async (item) => {
    
    var user = item.user;
    var operation = item;
    
    try{

        var sql_1  = 'INSERT INTO user (id, name) VALUES (?,?)'
        var sql_2  = 'INSERT INTO operation (id,type,idUser,symbol,shares,price,timestamp) VALUES (?,?,?,?,?,?,?)'

        db.run(sql_1,[user],(err) => {
            if(!err){
                db.run(sql_2,[operation]);
            }
        })
        
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
    
}

const deleteTrades = async () => {
    var sql  = 'DELETE FROM operation';
    var result = await db.query(sql, (err) => {
        if(err){
            return 0;
        }
    });

    return result;
}

const getAllTrades = async () => {
    var sql  = 'Select * from operation'

    var result = await db.query(sql,[]);

    return result;
}

const getTradeByID = async (idUser) => {
    var sql  = 'Select * from operation where idUser = ?'

    var param = [idUser]

    var result = await db.query(sql,param, (err) => {
        if(err){
            return [];
        }
    });

    return result;
}


module.exports = {
    addTrades,
    deleteTrades,
    getAllTrades,
    getTradeByID
}
