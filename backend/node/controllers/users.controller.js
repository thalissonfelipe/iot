const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserController {
    async login(req, res) {
        try {
            const body = req.body;
            const user = await User.findOne({ username: body.username });

            if (!user) {
                return res.status(401).send('Invalid username or password.');
            }

            if (!bcrypt.compareSync(body.password, user.password)) {
                return res.status(401).send('Invalid username or password.');
            }

            return res.status(200).send('OK');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Internal Error!');
        }
    }

    async register(req, res) {
        try {
            const body = req.body;

            let user = await User.findOne({ username: body.username });

            if (user) {
                return res.status(409).send('Username already exists.');
            }

            user = await User.findOne({ email: body.email });

            if (user) {
                return res.status(409).send('Email already exists.');
            }

            body.password = await bcrypt.hash(body.password, 10);

            await User.create(body);

            return res.status(201).send('User created.');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Internal Error!');
        }
    }
}

module.exports = new UserController();
