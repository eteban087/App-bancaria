const catchAsync = require('../helpers/catchAsync');
const User = require('../model/users.model');
const Transfer = require('../model/transfers.model');
const AppError = require('../helpers/appError');
const transfer = catchAsync(async (req, res, next) => {
  const { amount, receiverUserId, senderUserId } = req.body;

  const senderUser = await User.findOne({
    where: {
      id: senderUserId,
      status: 'active',
    },
  });

  const receiverUser = await User.findOne({
    where: {
      id: receiverUserId,
      status: 'active',
    },
  });

  if (!senderUser) {
    return next(new AppError(`User with id ${senderUserId} not found`, 404));
  }

  if (!receiverUser) {
    return next(new AppError(`User with id ${receiverUserId} not found`, 404));
  }

  if (receiverUserId === senderUserId) {
    return next(new AppError('action not allowed', 400));
  }

  if (senderUser.amount < amount) {
    return next(
      new AppError(
        `account ${senderUser.accountNumber} does not have enough funds to send this amount of ${amount}`,
        400
      )
    );
  }

  const transfer = await Transfer.create({
    senderUserId,
    amount,
    receiverUserId,
  });

  const newAmountsenderUser = senderUser.amount - transfer.amount;
  const newAmountReceiverUser = receiverUser.amount + transfer.amount;

  senderUser.update({
    amount: newAmountsenderUser,
  });

  receiverUser.update({
    amount: newAmountReceiverUser,
  });

  return res.status(200).json({
    status: 'success',
    transfer,
  });
});

module.exports = {
  transfer,
};
