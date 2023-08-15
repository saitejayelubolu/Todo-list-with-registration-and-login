const userModel = require("../Model/userModel");
var config = require("../../../helpers/config");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { Error } = require("mongoose");
//test get api
exports.testGet = function (req, res) {
  res.send({ status: true, message: "Hello Users comming soon...!" });
};

//Register
exports.register = function (req, res) {
  this.checkEmailExist(req, res, function (result) {
    if (result) {
      this.registerUser(req, res);
    }
  });
};

checkEmailExist = function (req, res, callback) {
  if (req.body.email) {
    userModel
      .find({
        email: req.body.email,
      })
      .then(data => {
        if (data.length > 0) {
          res.status(401).json({
            status: false,
            message: "Email already Exist",
            errors: "Email already Exist",
          });
          return;
        }
        callback(true);
      })
      .catch(err => {
        res.status(401).json({
          status: false,
          message: "Request failed",
          errors: err,
        });
        return;
      });
  } else {
    res.status(400).json({
      status: false,
      message: "Email is required",
      errors: "Email is required",
    });
    return;
  }
};

registerUser = async function (req, res) {
  var newUser = new userModel();
  newUser.email = req.body.email ? req.body.email : "";
  password = req.body.password ? req.body.password : "";
  const salt = await bcrypt.genSalt(10);
  const hashPassword = bcrypt.hash(password, salt);
  newUser.password = await hashPassword;
  newUser.name = req.body.name ? req.body.name : "";
  newUser.gender = req.body.gender ? req.body.gender : "";
  newUser
    .save()
    .then(userObj => {
      let token = jwt.sign(
        {
          email: userObj.email,
          password: userObj.password,
          name: userObj.name,
          gender: userObj.gender,
        },
        config.JWT_SECRET,
        {
          expiresIn: "24h", // expires in 24 hours
        }
      );
      res.json({
        status: true,
        token: token,
        message: "Registeration successful",
      });
    })
    .catch(err => {
      res.status(401).send({
        status: false,
        message: "Request failed",
        errors: err,
      });
      return;
    });
};

//Fetch all users
exports.fetchAllUsers = function (req, res) {
  userModel
    .find()
    .then(result => {
      res.send({
        status: true,
        message: "successfully fetch all the users",
        data: result,
      });
    })
    .catch(err => {
      res.status(401).send({
        status: false,
        message: "Request failed",
        errors: err,
      });
      return;
    });
};

// Login
exports.login = function (req, res) {
  var params = {
    email: req.body.email,
  };
  userModel
    .findOne(params)
    .then(async userObj => {
      if (userObj == null) {
        res.status(404).json({
          status: false,
          message: "User not found",
        });
        return;
      }

      const match = await bcrypt.compare(req.body.password, userObj.password);
      if (match == false) {
        res.status(400).send({
          status: false,
          message: "Password is incorrect",
        });
        return;
      }

      let token = jwt.sign(
        {
          email: userObj.email,
          password: userObj.password,
          name: userObj.name,
          gender: userObj.gender,
        },
        config.JWT_SECRET,
        {
          expiresIn: "24h", // expires in 24 hours
        }
      );
      res.json({
        status: true,
        token: token,
        message: "Login successful",
      });
    })
    .catch(error => {
      res.status(401).send({
        status: false,
        message: "Request failed",
        errors: error,
      });
      return;
    });
};
