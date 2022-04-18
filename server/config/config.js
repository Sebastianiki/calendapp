module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "boilerpern",
    host: process.env.DB_HOST,
    dialect: "postgres"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
}
