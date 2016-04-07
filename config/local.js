module.exports={
  connections: {
    mongo: {
      module: 'sails-mongo',
      url: process.env.OPENSHIFT_MONGODB_DB_URL+'fightdb' || 'mongodb://127.0.0.1:27017/fightdb'
    }
  },
  host: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0",
  explicitHost: process.env.OPENSHIFT_APP_DNS || "localhost",
  port: process.env.OPENSHIFT_NODEJS_PORT || 1337,
  environment: process.env.NODE_ENV || 'development'
};
