require('dotenv').config();

module.exports = {
  development: {
    username: "postgres",
    password: "postgresql",
    database: "boilerpern",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'postgres',
    protocol: 'postgres',
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  }
}
