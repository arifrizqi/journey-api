module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profilePhotoUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        disabilityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'disabilities', // Nama tabel yang menjadi referensi
                key: 'id' // Nama kolom yang menjadi referensi
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false

        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false

        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        tableName: 'users',
        timestamps: true
    });

    return User

}
