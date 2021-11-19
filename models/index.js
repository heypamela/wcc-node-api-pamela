const dbConfig = require ("../config/db.config");
const Sequelize = require ('sequelize');

const sequelizeOptions = { dialect: dbConfig.dialect };

const sequelizeDataBase = new Sequelize(dbConfig.connectionStringUrl, sequelizeOptions );

const database = {
    Sequelize,
    sequelizeDataBase
};

const artigosModel = require ("./artigos.model");
database.artigos = artigosModel(sequelizeDataBase, Sequelize); 


module.exports = database;