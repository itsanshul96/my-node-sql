const mysql = require("mysql");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs-login'
});

exports.register = (req, res) => {

    console.log(req.body);

    const {
        name,
        email,
        password
    } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.log('This one first' + error);
            }
            if (results.length > 0) {
                return res.render('register', {
                    message: 'That email is already in use'
                });
            }

            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            db.query("INSERT INTO users SET ?", {name: name, email: email, password: hashedPassword}, (error, results) =>{
                if (error) {
                    console.log('Second Error' + error);
                }
                else {
                    return res.render('index', {
                        message: 'Aap registerd ho gaye hai'
                    });
                }
            });
        });
}