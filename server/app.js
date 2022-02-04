
require('dotenv').config();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const { userRouter, mapRouter, reviewRouter, storeRouter } = require('./router');

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CORS_HOST, process.env.LB_HOST],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  })
);

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

app.use('/user', userRouter);
app.use('/map', mapRouter);
app.use('/review', reviewRouter);
app.use('/store', storeRouter);

module.exports = app.listen(HTTPS_PORT, () => {
    console.log(`      🚀 Server is starting on ${HTTPS_PORT}`);
  });