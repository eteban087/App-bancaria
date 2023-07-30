const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { globalErrorHandler } = require('./controller/error.controller');
const userRouter = require('./routes/user.routes');
const transfersRouter = require('./routes/tranfers.routes');
const AppError = require('./helpers/appError');
const app = express();

app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/transfers', transfersRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can´t find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = { app };
