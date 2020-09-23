const mongoose = require("./model/connection");
const express = require("express");
const handlebars = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const bodyparser = require("body-parser");
const qstring = require("querystring");
const url = require("url");

const userAuthController = require("./controllers/loginregister.controller");
const productController = require("./controllers/product.controller");
const productCRUDController = require("./controllers/productCRUD.controller");

const app = express();

app.set("view engine", "hbs");

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "mainlayout",
    layoutsDir: __dirname + "/views/layouts",
    helpers: require("./views/custom-helpers/mobilemart.helper").helpers,
    //helpers: require("./views/custom-helpers/mobilemart2.helper").helpers,   **adding two helper file not works
  })
);

app.set("/", path.join(__dirname, "/views"));



app.use(
  bodyparser.urlencoded({
    extended: false,
    limit: '50MB'

  })
);


app.get("/", (req, res) => {
  res.render("index", { firstGet: 1, title: "Home-ShopName" });
});

app.use(session({ secret: "ssshhhhh", resave: true, saveUninitialized: true }));
app.use(
  "/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist")
);
app.use(express.static("public"));
app.use("/login", userAuthController);
app.use("/product", productController);
app.use("/admin/product", productCRUDController);



app.use(
  session({
    secret: "ssshhhhh",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60000 },
  })
);

app.listen("3000", () => {
  console.log("Server Started at port 3000");
});
