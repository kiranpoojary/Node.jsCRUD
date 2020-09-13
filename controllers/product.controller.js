const express = require("express")
const mongoose = require("mongoose");
const router = express.Router();
const session = require("express-session")

var sess
var prID
router.get("/", (req, res) => {
    sess = req.session;
    var productLink = new URL(req.protocol + '://' + req.get('host') + req.originalUrl)
    prID = productLink.searchParams.get("productID")
    console.log(prID)
    console.log(sess.userID)
    console.log("Admin Accouint :" + sess.admin)
    res.render("product", { productID: prID, title: "Samsung Note9 Pro Max", logged: sess.logged })

})


router.post("/buyNow", (req, res) => {
    sess = req.session;
    if (sess.logged && !sess.admin) {
        res.render("shippingDetails", { title: "Shipping Details" })
    } else {
        res.render("product", { productID: prID, title: "Samsung Note9 Pro Max", logged: sess.logged })
    }
})

module.exports = router;

