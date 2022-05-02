const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('readinglists', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            read: {
                type: DataTypes.BOOLEAN,
            },
            'updated_at': DataTypes.DATE,
            'created_at': DataTypes.DATE
        })
        await queryInterface.addColumn('readinglists', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        })
        await queryInterface.addColumn('readinglists', 'blog_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'blogs', key: 'id' },
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('readinglists')
    },
}