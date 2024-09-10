const express = require('express');
const userRouter = require('./routes/userRouter');

const app = express();

// app.use('/api/v1/users', userRouter);
app.use('/', (req, res)=>{
    console.log('Thats the route')
})

module.exports = app;
