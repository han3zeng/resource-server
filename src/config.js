module.exports = Object.freeze({
  nodeEnv: process.env.NODE_ENV,
  allowedOrigins: [
    'http://localhost:8080',
    'http://localhost:3000',
    'https://authorization-server-7kgn6zbeya-uc.a.run.app',
    'https://react-playground-7kgn6zbeya-uc.a.run.app'
  ],
  domain: process.env.NODE_ENV === 'production' ? 'resource-server-7kgn6zbeya-uc.a.run.app' : 'localhost',
  clientDomain: process.env.NODE_ENV === 'production' ? 'react-playground-7kgn6zbeya-uc.a.run.app' : 'localhost'
});
