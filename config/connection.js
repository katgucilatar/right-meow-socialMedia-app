// connect to database
const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialsDB';

connect(connectionString);

module.exports = connection;