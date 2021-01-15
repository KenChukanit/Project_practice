// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'knex_cohorts'
    }
  },
  migrations: {
    tableName: 'migrations',
    directory : './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};
