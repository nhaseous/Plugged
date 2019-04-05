const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
const cors = require('cors');
const users = require('./routes/user');
const posts = require('./routes/post');
const messages = require('./routes/message');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.store = session({
    name: "session",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: "/"
    }
});
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(app.store);
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/messages', messages);

//test
app.get('/', function(req, res) {
    res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    //console.log('Knowledge was here')
});
