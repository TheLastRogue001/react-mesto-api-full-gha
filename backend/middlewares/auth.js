/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');
const { JWT_SECRET, NODE_ENV } = require('../consts/consts');

module.exports = (req, res, next) => {
  let payload;
  try {
    const token = req.cookies.jwt;

    if (token) {
      payload = jwt.verify(
        token,
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
      );
      req.user = payload;
      next();
    } else {
      console.log(req.cookies);
      next(new UnauthorizedError('Необходима авторизация2!'));
    }
  } catch (error) {
    console.log(req.cookies.jwt);
    next(new UnauthorizedError('Необходима авторизация!1'));
  }
};
