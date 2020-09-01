const { Operation, User } = require('./../database/sqlite');

const getStocksByTrades = async (symbol, type) => {

    var array = await Operation.findAll({ include: [{ model: User,attributes:{exclude:['_id','operation_id']}}], where: { symbol, type }, raw: true, nest: true })

    var array2 = await Operation.findAll({ where: { symbol }, raw: true, nest: true })
    
    if (array2.length != 0) {
        return array;
    } else {
        return null;
    }

}

const getStocksByPriceDiff = async (symbol) => {

    var result = await Operation.findAll({ include: [{ model: User,attributes:{exclude:['_id','operation_id']}}], where: { symbol }, raw: true, nest: true })
    return result;
}

module.exports = {
    getStocksByPriceDiff,
    getStocksByTrades,
}