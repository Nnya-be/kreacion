const express = require('express');
const hpp = require('hpp');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const userRouter = require('./routes/userRouter');
const errorController = require('./controllers/errorController');
const postRouter = require('./routes/postRouter');
const reviewRouter = require('./routes/reviewRouter');
const replyRouter = require('./routes/replyRouter');
const authRouter = require('./routes/authRouter');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(hpp());
app.use(xss());

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(limiter);
app.use(errorController);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/reply', replyRouter);

module.exports = app;
