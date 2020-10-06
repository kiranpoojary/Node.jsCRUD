const express = require("express");
const session = require("express-session");
const router = express.Router();
const mongoose = require("mongoose");
const usersModel = new mongoose.model("users");
const mobileModel = new mongoose.model("mobiles")
const brandModel = new mongoose.model("brands")

var sess;

router.get("/", (req, res) => {
  var homeContent = getHomeContent(function (data) {
    res.render("index", { firstGet: 1, title: "Home-ShopName", mobiles: data });
  })
});

router.get("/login", (req, res) => {
  res.render("login", { loginFailed: false, title: "Login/Register" });
});

router.post("/login/logData", (req, res) => {
  var userID = req.body.userID;
  var password = req.body.password;
  sess = req.session;
  usersModel.countDocuments({ email: userID, password: password }, function (err, userCount) {
    if (!err) {
      if (userCount == 1) {
        //Yes,registered user
        sess.userID = req.body.userID;
        usersModel.countDocuments(
          { email: userID, userType: "Admin" },
          (err, adminCount) => {
            if (!err) {
              if (adminCount == 1) {
                //user is a admin
                sess.admin = true;
                sess.logged = true;
                brandModel.find((err, docs) => {
                  if (!err) {
                    res.render("admin/indexAdmin", { title: "Add Product", saved: false, notSaved: false, brands: docs })
                  }
                }).lean();
              } else {
                //else user is a Customer
                sess.admin = false;
                sess.logged = true;
                var homeContent = getHomeContent(function (data) {
                  res.render("index", { title: "HOME-SHOP", mobiles: data });
                })
              }
            } else {
              var homeContent = getHomeContent(function (data) {
                res.render("index", { title: "HOME-SHOP", mobiles: data });
              })
            }
          }
        );
      } else {
        res.render("login", {
          loginFailed: true,
          title: "Login / Registration",
          regFailed: false,
          regSuccess: false,
          error: false,
          mobiles: data
        });
      }
    } else {
      res.render("login", {
        loginFailed: false,
        title: "Login / Registration",
        regFailed: false,
        regSuccess: false,
        error: true,
        errorMessage: err,
      });
    }
  });
});

router.post("/regData", (req, res) => {
  uID = req.body.email;
  usersModel.countDocuments({ email: uID }, (err, userCount) => {
    if (!err) {
      if (userCount == 1) {
        console.log("Exist");
        res.render("login", {
          loginFailed: false,
          regSuccess: false,
          regFailed: false,
          title: "Login/Register",
          exist: true,
          existID: uID,
        });
      } else {
        const users = new usersModel();
        users.firstName = req.body.fName;
        users.lastName = req.body.lName;
        users.email = uID;
        users.mobile = req.body.mobile;
        users.password = req.body.psw;
        users.secQ = req.body.secQ;
        users.secA = req.body.secA;
        users.userType = "Customer";

        users.save((err, docs) => {
          if (!err) {
            res.render("login", {
              loginFailed: false,
              regSuccess: true,
              regFailed: false,
              title: "Login/Registration",
            });
          } else {
            res.render("login", {
              loginFailed: false,
              regSuccess: false,
              regFailed: true,
              title: "Login/Register",
              regFailed: true,
            });
          }
        });
      }
    } else {
      res.render("login", {
        loginFailed: false,
        title: "Login / Registration",
        regFailed: true,
        regSuccess: false,
        error: true,
        errorMessage: err,
      });
    }
  });
});


function getHomeContent(dataSender) {
  mobileModel.find(function (err, docs) {
    if (!err) {
      return dataSender(docs)
    } else {
      return false;
    }
  });
}

module.exports = router;
