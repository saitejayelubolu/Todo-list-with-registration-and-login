var express = require("express");
var router = express.Router();
var todoController = require("../Controller/todoController");
var auth = require("../../../middleware/auth");
var adminauth = require("../../../middleware/adminauth");

router.get("/test", todoController.testGet);
router.post("/todo", auth, todoController.createTodo);
router.put("/:id", auth, todoController.updateTodo);
router.delete("/:id", auth, todoController.deleteTodo);
router.get("/inprogresstodos", auth, todoController.fetchInprogressTodos);
router.get("/completedtodos", auth, todoController.fetchCompletedTodos);
router.get("/:id", auth, todoController.todoById);
module.exports = router;
