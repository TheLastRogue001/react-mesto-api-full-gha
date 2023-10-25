/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
} = require('../errors/errors');
const {
  SALT_TIMES,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
  NODE_ENV,
  JWT_SECRET,
  DB_DUBLICATE_ERROR_CODE,
} = require('../consts/consts');

const generateToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

const getUserSignIn = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) return next(new NotFoundError('Пользователь по указанному _id не найден'));
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Переданы некорректные данные в поле _id'));
      return next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) return next(new NotFoundError('Пользователь по указанному _id не найден'));
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Переданы некорректные данные в поле _id'));
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return next(new UnauthorizedError('Неправильная почта или пароль'));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return next(new UnauthorizedError('Неправильная почта или пароль'));
          const token = generateToken({ _id: user._id });
          return res.status(HTTP_STATUS_OK).send({ token });
        });
    })
    .catch((err) => {
      if (err.name === 'AuthFailed') return next(new UnauthorizedError('Неправильная почта или пароль'));
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, SALT_TIMES)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(HTTP_STATUS_CREATED).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      if (err.code === DB_DUBLICATE_ERROR_CODE) return next(new ConflictError('Пользователь с таким email уже зарегестрирован'));
      return next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) return res.send(user);
      return next(new NotFoundError('Пользователь с указанным _id не найден'));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      return next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) return res.send(user);
      return next(new NotFoundError('Пользователь с указанным _id не найден'));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequestError(`Переданы некорректные данные при обновлении аватара: ${err.message}`));
      return next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getUserSignIn,
};
