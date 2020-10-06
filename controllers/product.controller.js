const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const session = require("express-session");
const mobileModel = new mongoose.model("mobiles")

var sess;
var prID;
router.get("/", (req, res) => {
  sess = req.session;
  var productLink = new URL(
    req.protocol + "://" + req.get("host") + req.originalUrl
  );
  prCat = productLink.searchParams.get("productCat");
  prModel = productLink.searchParams.get("mobileModel");
  console.log("Cat " + prCat + prModel);
  console.log(sess.userID);
  console.log("Admin Account :" + sess.admin);

  mobileModel.find({ mobile: { mobileDetails: { category: prCat, model: prModel } } }, (err, docs) => {
    console.log(docs);
  })
  // res.render("product", {
  //   productCat: prCat,
  //   title: prCat,
  //   logged: sess.logged,
  // });
});

router.post("/buyNow", (req, res) => {
  sess = req.session;
  if (sess.logged && !sess.admin) {
    res.render("shippingDetails", { title: "Shipping Details" });
  } else {
    res.render("product", {
      productID: prID,
      title: "Samsung Note9 Pro Max",
      logged: sess.logged,
    });
  }
});

module.exports = router;
