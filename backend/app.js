const express = require('express');
const userRouter = require('./routes/userRouter');
const errorController = require('./controllers/errorController');

const app = express();

app.use(express.json());

app.use(errorController);
app.use('/api/v1/users', userRouter);

module.exports = app;
