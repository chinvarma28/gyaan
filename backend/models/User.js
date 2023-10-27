const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    token: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['student', 'teacher'],
        default: 'student'
    }

});

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({
            _id: this._id
        }, 'your_secret_key');
        return token;
    } catch (error) {
        throw error;
    }
}
module.exports = mongoose.model('User', userSchema);
