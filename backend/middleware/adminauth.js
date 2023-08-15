/*
Project : NFT-marketplace
FileName : adminauth.js
*/

let jwt = require("jsonwebtoken");
const config = require("./../helpers/config");

let adminauth = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token == null) {
    return res.status(401).json({
      status: false,
      message: "Auth token is not supplied",
    });
  }
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: false,
          message: "Token is not valid",
        });
      } else {
        if (decoded.role != "manager") {
          return res.status(401).json({
            status: false,
            message:
              "Access denied. you didn't have permission to access this end point",
          });
        }
        req.decoded = decoded;
        console.log("decoded", decoded.role);
        next();
      }
    });
  } else {
    return res.status(401).json({
      status: false,
      message: "Auth token is not supplied",
    });
  }
};

module.exports = adminauth;
