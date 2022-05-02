const {Model, DataTypes} = require("sequelize");
const { sequelize } = require('../util/db')

class Session extends Model {}
Session.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    sessionId: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'session'
})

module.exports = Session