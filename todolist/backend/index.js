const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cors = require("cors");
const cookie = require("cookie-parser");
const config = require("./helpers/config");
const user = require("./modules/users/route/user");
const todo = require("./modules/todoList/route/todo");
const app = express();
const port = config.app.port;
app.use(
  bodyParser.json({
    limit: "100mb",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "100mb",
  })
);
app.use(cors());
app.use(cookie());

//mongodb connection
const dbURL =
  "mongodb+srv://" +
  config.db.username +
  ":" +
  config.db.password +
  "@cluster0.ni99lik.mongodb.net/" +
  config.db.name +
  "?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(dbURL, connectionParams)
  .then(() => {
    console.info("connected to the DB");
  })
  .catch(e => {
    console.log("Error:", e);
  });

//apis
app.get("/", (req, res) => {
  res.send("comming soon!");
});
// //account
app.use("/user", user);
app.use("/todo", todo);

app.listen(port, () => {
  console.log("Running in the port no:", port);
});
