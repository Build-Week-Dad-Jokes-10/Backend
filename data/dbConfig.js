const knex = require('knex')('production');
const config = require('../knexfile.js');
const dbEnv = process.env.DB_ENV;
const db =  knex(config[dbEnv])
module.exports = db

