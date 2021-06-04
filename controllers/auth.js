const mysql = require("mysql");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs-login'
});

exports.login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        if (!email || !password) {
            return res.status(400).render('login', {
                message: 'Please provide an email and password'
            });
        }
        db.query('select * from users where the email = ?', [email], async (error, results) => {
            console.log(results);
            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                res.status(401).render('login', {
                    message: 'The email or the password is incorrect'
                });
            } /* /* else {
                const id = results[0].id;
                const token = jwt.sign({
                    id: id
                }, process.env.JWT_SECRET) 
            } */
        });
    } catch (error) {
        console.log(error);
    }
}


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

        db.query("INSERT INTO users SET ?", {
            name: name,
            email: email,
            password: hashedPassword
        }, (error, results) => {
            if (error) {
                console.log('Second Error' + error);
            } else {
                return res.render('index', {
                    message: 'User Successfully registerd..!!'
                });
            }
        });
    });
}