const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const game = 'artifact';

let dbUrl = 'mongodb://localhost:27017/' + game;
mongoose.connect(dbUrl);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo DB connection'));

const cardRouter = require('./routes/card.route');

app.use('/cards', cardRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let port = 3000;
app.listen(port, () => {
    console.log('Server is listening on: ' + port);
});