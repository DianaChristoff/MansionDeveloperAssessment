const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

bodyParser = require("body-parser");

const userController = require('../controllers/userController')

dotenv.config();


app.use("/assets", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");
    app.listen(3000, () => console.log("Server Up and running"));
});

app.set("view engine", "ejs");


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: true,
    saveUninitialized: true
}));


app.get('/', (req, res) => {
    res.redirect('/register');
});

userController(app);
