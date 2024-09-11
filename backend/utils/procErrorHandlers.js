const uncaughtException = (err) => {
  console.log('Uncaught Exception: ', err.name, err.message);
  console.log('Uncaught Exception Occured, Shutting Down!');
  process.exit(1);
};

const unhandledRejection = (err) => {
  console.log('Unhandled Rejection: ', err.name, err.message);
  console.log('Unhandled Rejection Occured, Shutting Down!');
  process.exit(1);
};

const handleSigterm = () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
};

const handleSigint = () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
};

module.exports = {
  uncaughtException,
  unhandledRejection,
  handleSigint,
  handleSigterm,
};
