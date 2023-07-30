const express = require('express');

const { transfer } = require('../controller/transfers.controller');
const { transferValidation } = require('../middlewares/validation.middlewares');
const router = express.Router();

router.post('/', transferValidation, transfer);

module.exports = router;
