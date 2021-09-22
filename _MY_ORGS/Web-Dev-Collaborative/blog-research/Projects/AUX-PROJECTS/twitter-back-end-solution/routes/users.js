const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../utils');
const { getUserToken, requireAuth } = require('../auth');
const router = express.Router();
const db = require('../db/models');

const { User, Tweet, Follow } = db;

const validateEmailAndPassword = [
  check('email').exists({ checkFalsy: true }).isEmail().withMessage('Please provide a valid email.'),
  check('password').exists({ checkFalsy: true }).withMessage('Please provide a password.'),
  handleValidationErrors,
];

router.post(
  '/',
  check('username').exists({ checkFalsy: true }).withMessage('Please provide a username'),
  validateEmailAndPassword,
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, hashedPassword });

    const token = getUserToken(user);
    res.cookie('access_token', token, { signed: true });
    res.status(201).json({
      user: { id: user.id },
      token,
    });
  })
);

router.post(
  '/token',
  validateEmailAndPassword,
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !user.validatePassword(password)) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
  })
);

router.get(
  '/:id/tweets',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const tweets = await Tweet.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.json({ tweets });
  })
);

router.post('/addFollow', async (req, res) => {
  try {
    const user1 = await User.findByPk(2);
    const user2 = await User.findByPk(1);
    await user1.addFollower(user2);
    await user1.save();
    // const userWithFollows = await User.findByPk(3, { include: { model: Follow, as: 'follows' } });
    // console.log(userWithFollows);
    res.json({ user1 });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.get('/followers', async (req, res, next) => {
  try {
    const user = await User.findByPk(3, { include: { model: User, as: 'followedAuthors' } });
    console.log(JSON.stringify(user));
    const followers = user.followers.map((follower) => ({ username: follower.username, email: follower.email }));
    res.json({ followers });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
