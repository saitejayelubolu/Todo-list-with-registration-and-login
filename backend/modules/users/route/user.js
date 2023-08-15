var express = require("express");
var router = express.Router();
var userCountroller = require("../Controller/userController");
var auth = require("../../../middleware/auth");
var adminauth = require("../../../middleware/adminauth");

router.get("/test", userCountroller.testGet);
router.post("/register", userCountroller.register);
router.get("/allusers", userCountroller.fetchAllUsers);
router.post("/login", userCountroller.login);
// router.get("/allaccounts", adminauth, accountCountroller.fetchAllAccounts);
// router.get("/account", adminauth, accountCountroller.fetchAccountDetailsById);
// router.put("/update", adminauth, accountCountroller.updateAccountDetails);
// router.post("/transaction", auth, accountCountroller.transaction);
// router.get(
//   "/alltransactions",
//   adminauth,
//   accountCountroller.fetchAllTransaction
// );
// router.get(
//   "/transaction",
//   adminauth,
//   accountCountroller.fetchAccountDetailsById
// );
// router.put("/allowtransaction", adminauth, accountCountroller.allowTransaction);
module.exports = router;
