const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.register = async (req, res, next) => {
    try {
        const {
            username,
            password,
            type
        } = req.body;
        console.log(req.body)
        const existingUser = await User.findOne({
            username
        });
        if (existingUser) return res.status(400).json({
            message: 'User already exists.'
        });
        const user = new User({
            username,
            password,
            role:type
        });
        console.log(user)
        await user.save();
        const token = await user.generateAuthToken();
        const updatedUser=await User.findByIdAndUpdate(user._id,{token:token},{new:true});
        console.log(token,"token");

        res.json({
            message: 'User registered successfully.',
            token: token
        });
    } catch (error) {
        next(error);
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({
            message: info.message
        });
        const role = req.body.type;
        if (role != user.role) {
            return res.status(401).json({
                message: 'Invalid Role'
            });
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
            const token = jwt.sign({
                _id: user._id
            }, 'your_secret_key');
            
            return res.json({
                message: 'Login successful.',
                token: token
            });
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    res.json({
        message: 'Logout successful.'
    });
};

exports.getUserProfile = (req, res, next) => {
    const token = req.query.token
    console.log(req.body)
    jwt.verify(token, 'your_secret_key', (err, decodedToken) => {
        if (err) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
        // Here, `decodedToken` will contain the user information (e.g., _id)
        const userId = decodedToken._id;

        // Now you can fetch the user details using `userId` and send it as the response
        // Assuming you have a User model
        User.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'User not found'
                    });
                }

                res.json({
                    user
                });
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                res.status(500).json({
                    message: 'Internal server error'
                });
            });
    });
}
