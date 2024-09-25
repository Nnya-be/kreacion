const express = require('express');
const userRouter = require('./routes/userRouter');
const errorController = require('./controllers/errorController');
const postRouter = require('./routes/postRouter');
const reviewRouter = require('./routes/reviewRouter');
const replyRouter = require('./routes/replyRouter');
const authRouter = require('./routes/authRouter');
const app = express();

app.use(express.json());

app.use(errorController);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/reply', replyRouter);

module.exports = app;
