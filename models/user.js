const {Model, DataTypes} = require("sequelize");
const { sequelize } = require('../util/db')

class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize,
    underscored: true,
    modelName: 'user',
    defaultScope: {
        where: {
            disabled: false
        }
    },
})

module.exports = User