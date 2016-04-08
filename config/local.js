module.exports={
  connections: {
    mongo: {
      adapter: 'sails-mongo',
      host: process.env.OPENSHIFT_MONGODB_DB_HOST,
      port: 27017,
      user: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
      password: process.env.OPENSHIFT_MONGODB_DB_PASSWORD,
      database: 'fightdb'
    }
  },
  host: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0",
  explicitHost: process.env.OPENSHIFT_APP_DNS || "localhost",
  port: process.env.OPENSHIFT_NODEJS_PORT || 1337,
  environment: process.env.OPENSHIFT_MONGODB_DB_HOST ? 'production' : 'development'
};
