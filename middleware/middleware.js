const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.KEY);

  next();
};
module.exports = authenticate;
