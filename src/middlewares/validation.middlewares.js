const { validationResult, body, check } = require('express-validator');

exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

const createUserValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[A-Za-z]/)
    .withMessage('password must have at least one letter'),

  this.validateFields,
];

const logInUservalidation = [
  body('accountNumber').notEmpty().withMessage('Account Number is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[A-Za-z]/)
    .withMessage('password must have at least one letter'),

  this.validateFields,
];

const transferValidation = [
  body('amount').notEmpty().withMessage('Amount is required'),
  body('receiverUserId').notEmpty().withMessage('ReceiverUserId is require'),
  body('senderUserId').notEmpty().withMessage('SenderUserId is require'),
  this.validateFields,
];

module.exports = {
  createUserValidation,
  logInUservalidation,
  transferValidation,
};
