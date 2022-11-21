const User = require("../models/User");
const Address = require("../models/Address");
const BonusCode = require("../models/BonusCode");
const Country = require("../models/Country");

const validator = require('validator');
const bcrypt = require('bcrypt');

module.exports = function (app) {
    app.get("/register", (req, res) => {
        Country.find().lean().exec().then((countries) => {
            res.render("register.ejs", { countries: countries });
        })
    });

    app.get('/users', (req, res) => {
        User.find().lean().exec().then((users) => {
            res.render("userslist.ejs", { users: users });
        })
    });


    app.post('/register', async (req, res, next) => {

        if (validator.isEmpty(req.body.username) || validator.isEmpty(req.body.name) || validator.isEmpty(req.body.email) || validator.isEmpty(req.body.password) || validator.isEmpty(req.body.confirmPassword)) {
            let error = "Please fill all required fields!";
            res.status(480).json(error);
        } else {
            const username = req.body.username;
            const name = req.body.name
            const email = req.body.email;
            const password = req.body.password;
            const confirmPassword = req.body.confirmPassword;

            if (validator.isLength(username, { min: 4, max: 12 }) === false) {
                let error = "Your username should be between 4 and 12 characters!";
                res.status(480).json(error);
                return;
            }

            if (validator.isEmail(email) === false) {
                let error = "Please enter a valid email!";
                res.status(480).json(error);
                return;
            }

            if (validator.isLength(password, { min: 6, max: 12 }) === false || (validator.isStrongPassword(password, { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }) === false)) {
                let error = "Your password must be 6-12 characters long, contain at least one uppercase, one lowercase letter, a number and a special character";
                res.status(480).json(error);
                return;
            }

            if (!validator.equals(password, confirmPassword)) {
                let error = "Confirmation does not match password!";
                res.status(480).json(error);
                return;
            }

            let hash = bcrypt.hashSync(password, 10);
            let userExists = await User.find({ username });

            if (userExists.length > 0) {
                res.status(480).json('Duplicate Username, Another user has already selected this username');
                return;
            }


            try {

                let user = await User({ username: username, name: name, email: email, password: hash }).save();

                req.session.loggedin = true;
                req.session.userid = user._id;

                res.status(200).json('User session created User Created');

            } catch (err) {
                res.status(480).json('Unable to create user');
            }
        }
    });


    app.post('/address', async (req, res, next) => {
        if (validator.isEmpty(req.body.address1) || validator.isEmpty(req.body.city) ||
            validator.isEmpty(req.body.postal_code) || validator.isEmpty(req.body.phone_num) || validator.isEmpty(req.body.country)) {

            let error = "Please fill all the required fields!";
            res.status(480).json(error);
            return;
        }

        try {
            const address1 = req.body.address1;
            const address2 = req.body.address2;
            const city = req.body.city;
            const postal_code = req.body.postal_code;
            const phone_num = req.body.phone_num;
            const bonus_code = req.body.bonus_code;
            const country = req.body.country;

            await User.findByIdAndUpdate(req.session.userid, { add_info: true });

            if (!validator.isEmpty(bonus_code)) {
                let address = Address({
                    user: req.session.userid, address1: address1, address2: address2, country: country, city: city,
                    postal_code: postal_code, phone_num: phone_num, bonus_code: true,
                }).save();


                let bonus_code = BonusCode({ user: req.session.userid, bonus_code: bonus_code }).save();

                res.status(200).json('Additional Info saved!');

            } else {
                let address = Address({
                    user: req.session.userid, address1: address1, address2: address2, country: country, city: city,
                    postal_code: postal_code, phone_num: phone_num, bonus_code: false,
                }).save();

                res.status(200).json('Additional Info saved!');


            }
        } catch (err) {
            res.status(480).json('Unable to save address');
        }
    });

}