const userModel = require("../../users/Model/userModel");
const todoModel = require("../Model/todoModel");
var config = require("../../../helpers/config");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { Error } = require("mongoose");
const { response } = require("express");
//test get api
exports.testGet = function (req, res) {
  res.send({ status: true, message: "Hello Users comming soon...!" });
};

exports.createTodo = function (req, res) {
  const emailId = req.decoded.email;
  userModel
    .findOne({ email: emailId })
    .then(userObj => {
      if (userObj == null) {
        res.status(404).json({
          status: false,
          message: "User not found",
        });
        return;
      } else {
        const newTodo = new todoModel();
        newTodo.title = req.body.title ? req.body.title : "";
        newTodo.description = req.body.description ? req.body.description : "";
        newTodo.email = emailId;
        newTodo.status = "inprogress";
        newTodo
          .save()
          .then(result => {
            res.send({
              status: true,
              message: "Todo created successfully",
              data: result,
            });
          })
          .catch(error => {
            console.log("1", error);
            res.status(401).send({
              status: false,
              message: "Title is already exist",
              errors: error,
            });
            return;
          });
      }
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

exports.updateTodo = function (req, res) {
  const emailId = req.decoded.email;
  userModel
    .findOne({ email: emailId })
    .then(userObj => {
      if (userObj == null) {
        res.status(404).json({
          status: false,
          message: "User not found",
        });
        return;
      } else if (userObj.email == emailId) {
        todoModel
          .findOne({ email: emailId, _id: req.params.id })
          .then(todoObj => {
            if (todoObj == null) {
              res.status(404).json({
                status: false,
                message: "Todo not found",
              });
              return;
            } else {
              todoObj.title = req.body.title ? req.body.title : todoObj.title;
              todoObj.description = req.body.description
                ? req.body.description
                : todoObj.description;
              todoObj.status = req.body.status
                ? req.body.status
                : todoObj.status;
              todoObj
                .save()
                .then(result => {
                  res.send({
                    status: true,
                    message: "Todo updated successfully",
                    data: result,
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
            }
          })
          .catch(error => {
            res.status(401).send({
              status: false,
              message: "Request failed",
              errors: error,
            });
            return;
          });
      }
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

exports.deleteTodo = function (req, res) {
  const emailId = req.decoded.email;
  userModel
    .findOne({ email: emailId })
    .then(userObj => {
      if (userObj == null) {
        res.status(404).json({
          status: false,
          message: "User not found",
        });
        return;
      } else if (userObj.email == emailId) {
        todoModel
          .deleteOne({ email: emailId, _id: req.params.id })
          .then(todoObj => {
            if (todoObj.deletedCount == 0) {
              res.status(404).send({
                status: false,
                message: "Not found",
              });
            } else {
              res.send({
                status: true,
                message: "Todo has been deleted successfully",
                data: todoObj,
              });
            }
          })
          .catch(error => {
            res.status(401).send({
              status: false,
              message: "Request failed",
              errors: error,
            });
            return;
          });
      }
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

exports.fetchInprogressTodos = function (req, res) {
  const emailId = req.decoded.email;
  userModel
    .findOne({ email: emailId })
    .then(userObj => {
      if (userObj == null) {
        res.status(404).json({
          status: false,
          message: "User not found",
        });
        return;
      } else if (userObj.email == emailId) {
        todoModel
          .find({ email: emailId, status: "inprogress" })
          .then(todoObj => {
            if (todoObj.length == 0) {
              res.send({
                status: false,
                message: "No todos Inprogress",
              });
            } else {
              res.send({
                status: true,
                message: "Fetched Inprogress Todos successfully",
                data: todoObj,
              });
            }
          })
          .catch(error => {
            res.status(401).send({
              status: false,
              message: "Request failed",
              errors: error,
            });
            return;
          });
      }
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

//todo list for status completed

exports.fetchCompletedTodos = function (req, res) {
  const emailId = req.decoded.email;
  userModel
    .findOne({ email: emailId })
    .then(userObj => {
      if (userObj == null) {
        res.status(404).json({
          status: false,
          message: "User not found",
        });
        return;
      } else if (userObj.email == emailId) {
        todoModel
          .find({ email: emailId, status: "completed" })
          .then(todoObj => {
            if (todoObj.length == 0) {
              res.send({
                status: false,
                message: "Their is no completed todos",
              });
            } else {
              res.send({
                status: true,
                message: "Fetched completed Todo List",
                data: todoObj,
              });
            }
          })
          .catch(error => {
            res.status(401).send({
              status: false,
              message: "Request failed",
              errors: error,
            });
            return;
          });
      }
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

//get todo by id
exports.todoById = function (req, res) {
  const emailId = req.decoded.email;
  userModel
    .findOne({ email: emailId })
    .then(userObj => {
      if (userObj == null) {
        res.status(404).json({
          status: false,
          message: "User not found",
        });
        return;
      } else if (userObj.email == emailId) {
        todoModel
          .findOne({ email: emailId, _id: req.params.id })
          .then(todoObj => {
            if (todoObj == null) {
              res.status(404).json({
                status: false,
                message: "Todo not found",
              });
              return;
            } else {
              res.send({
                status: true,
                message: "Fetch data successfully",
                data: todoObj,
              });
            }
          })
          .catch(error => {
            res.status(401).send({
              status: false,
              message: "Request failed",
              errors: error,
            });
            return;
          });
      }
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
