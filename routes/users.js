'use strict';

const express = require('express');
const router = express.Router();
const {  User } = require('../models');
const { authenticateUser } = require('../middleware/auth-user');
const { asyncHandler } = require('../middleware/async-handler');

router.get('/', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress
  });
}));

router.post('/', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).location('/').end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

module.exports = router;