module.exports = Object.freeze({
  nodeEnv: process.env.NODE_ENV,
  allowedOrigins: ['http://localhost:8080', 'http://localhost:3000'],
  domain: process.env.NODE_ENV === 'production' ? '' : 'localhost'
});
