const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

//configure the db
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connect to the db
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("DB connected successfully");
}).catch(err => {
    console.log('Could not connect to the DB...', err);
    process.exit();
});

//require crud routes
require('./app/routes/crud.routes.js')(app);


app.listen(3000, ()=> {
    console.log(`App is listening on port ${port}`);
})