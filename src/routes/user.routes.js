const { signUp, logIn } = require('../controller/user.controller');
const express = require('express');

const {
  createUserValidation,
  logInUservalidation,
} = require('../middlewares/validation.middlewares');
const router = express.Router();

router.post('/signup', createUserValidation, signUp);
router.post('/login', logInUservalidation, logIn);

module.exports = router;
