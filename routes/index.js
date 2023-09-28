'use strict';

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

module.exports = router;