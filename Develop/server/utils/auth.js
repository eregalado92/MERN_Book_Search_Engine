const jwt = require('jsonwebtoken');

const secret = 'mynewsecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function (req, res, next) {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'You are not authenticated!' });
    }

    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded.data;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: 'Invalid token!' });
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign(payload, secret, { expiresIn: expiration });
  },
};
