const jwt = require("jsonwebtoken");

exports.verifyJWT = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    return res.sendStatus(401);
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
