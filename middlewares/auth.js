const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

// const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Пользователь не найден'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      // NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      'super-strong-secret',
    );
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
