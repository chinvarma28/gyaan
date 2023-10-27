const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

module.exports = function (passport) {
    passport.use(new LocalStrategy(
        async function (username, password, done) {
            try {
                const user = await User.findOne({
                    username
                });
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }
                const isPasswordValid = await user.comparePassword(password);
                if (!isPasswordValid) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};
