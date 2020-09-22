module.exports = {
  development: {
    client: 'pg',
    connection: {
      port: '47398',
      database: 'kodovi',
      user: 'kodovi',
      password: 'kodovi'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      port: '47398',

      database: 'kodovi',
      user: 'kodovi',
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
    client: 'pg',
    connection: {

      port: '47398',

      database: 'kodovi',
      user: 'kodovi',
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