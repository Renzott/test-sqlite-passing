const { Operation, User, sequelize } = require('./../database/sqlite');

const addTrades = async (item) => {

    var { user } = item;

    var t = await sequelize.transaction();

    try {
        
        var _operation = await Operation.create(item);
        var _user = await User.create(user);    
        _operation.setUser(_user);
        
        await t.commit();
        
        return true;
    } catch (e) {
        await t.rollback();
        
        return false;
    }

}

const deleteTrades = async () => {

        await sequelize.sync()
        await Operation.destroy({ truncate: true });
        await User.destroy({ truncate: true });

    return 0;
}

const getAllTrades = async () => {

    var data = await Operation.findAll({ include: [{ model: User, attributes: { exclude: ['_id','operation_id'] } }], raw: true, nest: true });
    return data;
}

const getTradeByID = async (id) => {

    var data = await Operation.findAll({ include: [{ model: User, attributes: { exclude: ['_id','operation_id'] }, where: { id } }], raw: true, nest: true });
    return data;
}


module.exports = {
    addTrades,
    deleteTrades,
    getAllTrades,
    getTradeByID
}
