"use strict";

const Constants = {
  database: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      user: 'oslo_hitlist_app',
      password: 'oslo_hitlist_pw',
      database: 'oslo_hitlist_dev',
      charset:  'utf8'
    }
  }
};

module.exports = Constants;
