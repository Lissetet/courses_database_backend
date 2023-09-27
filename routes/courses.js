'use strict';

const express = require('express');
const router = express.Router();
const {  User, Course } = require('../models');
const { authenticateUser } = require('../middleware/auth-user');
const { asyncHandler } = require('../middleware/async-handler');

const include = [
  {
    model: User,
    as: 'user',
    attributes: ['id', 'firstName', 'lastName', 'emailAddress']
  }
]

const attributes = {
  exclude: [
    'createdAt', 
    'updatedAt',
    'userId'
  ]
}

router.get('/', asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    attributes,
    include
  });
  res.json(courses);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    attributes,
    include
  });
  res.json(course);
}));

router.post('/', authenticateUser, asyncHandler(async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).location(`/api/courses/${course.id}`).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

router.put('/:id', authenticateUser, asyncHandler(async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    const { currentUser } = req

    if (course) {
      if (currentUser.id !== course.userId ) {
        res.status(403).end()
      } else {
        await course.update(req.body);
        res.status(204).end();
      }
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

router.delete('/:id', authenticateUser, asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  const { currentUser } = req

  if (course) {
    if (currentUser.id !== course.userId) {
      res.status(403).end()
    } else {
      await course.destroy();
      res.status(204).end();
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
}));

module.exports = router;