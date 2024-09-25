const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const app = require('./app');
const serverErrors = require('./utils/procErrorHandlers');

dotEnv.config({
  path: './config.env',
});

process.on('uncaughtException', serverErrors.uncaughtException);
process.on('unhandledRejection', serverErrors.unhandledRejection);
process.on('SIGTERM', serverErrors.handleSigterm);
process.on('SIGINT', serverErrors.handleSigint);

const dbUrl = process.env.DB_CONNECTION.replace(
  '<db_password>',
  process.env.DB_PASSWORD,
);

mongoose.connect(dbUrl, {
  serverSelectionTimeoutMS: 5000,
});

const db = mongoose.connection;
db.on('connected', () => {
  console.log('Database Connection successful!');
});

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log('Server listening!');
});
