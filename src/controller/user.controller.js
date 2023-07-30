const catchAsync = require('../helpers/catchAsync');
const User = require('../model/users.model');
const { genRamdomNumber } = require('../helpers/genRamdomNum');
// const bcrypt = require('bcryptjs');
const AppError = require('../helpers/appError');

const signUp = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  const user = await User.create({
    name,
    password,
    accountNumber: genRamdomNumber(6),
  });

  return res.status(201).json({
    staus: 'success',
    message: 'The user has been created',
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
    },
  });
});

const logIn = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;
  const user = await User.findOne({
    where: {
      status: 'active',
      accountNumber,
    },
  });

  console.log(user);

  if (!user) {
    return next(
      new AppError(`user with account number ${accountNumber} not found`, 404)
    );
  }

  if (user.password !== password) {
    return next(new AppError('Incorrect Account number or password', 401));
  }

  return res.status(200).json({
    status: 'success',
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
    },
  });
});

module.exports = {
  signUp,
  logIn,
};
