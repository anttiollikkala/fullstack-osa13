const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('blogs', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            author: {
                type: DataTypes.TEXT,
            },
            url: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            likes: {
                type: DataTypes.INTEGER,
                validate: {
                    isInt: true,
                },
                defaultValue: 0,
            },
            'updated_at': DataTypes.DATE,
            'created_at': DataTypes.DATE
        })
        await queryInterface.createTable('users', {
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
            'updated_at': DataTypes.DATE,
            'created_at': DataTypes.DATE
        })
        await queryInterface.addColumn('blogs', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('users')
        await queryInterface.dropTable('blogs')
    },
}