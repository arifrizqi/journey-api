module.exports = (sequelize, DataTypes) => {
    const Disabilities = sequelize.define('disabilities', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        disability: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'disabilities'
    });



    return Disabilities;
};

// module.exports = disabilities;