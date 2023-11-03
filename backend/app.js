const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoute');
const passportConfig = require('./passportConfig');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb+srv://chinmayavarmav28:B26c2GMz66GucU4V@cluster0.yrhhsnj.mongodb.net/gyaan', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(bodyParser.json());

app.use(session({
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/user', userRoutes);
app.use('/book', bookRoutes);
app.use('/', reviewRoutes);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});


