module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      database: 'kodovi',
      user:     'kodovi',
      password: 'kodovi'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'kodovi',
      user:     'kodovi',
      password: 'kodovi'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'kodovi',
      user:     'kodovi',
      password: 'kodovi'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
