const dbConfig = require('../config/Config.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle

  }
}
)

sequelize.authenticate()
  .then(() => {
    console.log('connected..')
  })
  .catch(err => {
    console.log('Error' + err)
  })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./users.js')(sequelize, DataTypes)
db.disabilities = require('./disabilities.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('yes re-sync done!')
  })



// 1 to Many Relation

db.disabilities.hasMany(db.users, {
  foreignKey: 'disabilityId',
  as: 'disabilities'
});

db.users.belongsTo(db.disabilities, {
  foreignKey: 'id',
  as: 'user'
});






module.exports = db