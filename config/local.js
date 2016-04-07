module.exports={
  host: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0",
  explicitHost: process.env.OPENSHIFT_APP_DNS || "localhost",
  port: process.env.OPENSHIFT_NODEJS_PORT || 1337,
  environment: process.env.NODE_ENV || 'development'
};
