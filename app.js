const express = require("express");
const mysql = require("mysql");
const {
    dirname
} = require("path");

const path = require("path");

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs-login'
});
const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory));

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

app.set('view engine', 'hbs');

db.connect((error) => {
    if (error) {
        console.log('Mysql Error' + error);
    } else {
        console.log('Mysql is connected');
    }
})

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/register", (req, res) => {
    res.render("register");
});

app.use('/auth', require("./routes/auth"));

app.listen(5000, () => {
    console.log('My server is running on the port of 5000');
});
