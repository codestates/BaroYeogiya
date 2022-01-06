require('dotenv').config();
const env = process.env;

const development = {
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_DEV,
  host: env.DATABASE_HOST,
  dialect: env.DATABASE_DIALECT,
  port: env.DATABASE_PORT
};

const production = {
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_PRODUCTION,
  host: env.DATABASE_HOST,
  dialect: env.DATABASE_DIALECT,
  port: env.DATABASE_PORT
};

const test = {
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_TEST,
  host: env.DATABASE_HOST,
  dialect: env.DATABASE_DIALECT,
  port: env.DATABASE_PORT
};

module.exports = { development, production, test };