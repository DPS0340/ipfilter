const path = require('path');
const express = require('express');
const app = express();

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

const port = 4500;

app.use(function(req, res, next) {
    const localhost = ['127.0.0.1', 'localhost'];

    if (localhost.filter(e => req.get('host').includes(e)).length > 0) {
        console.log("localhost allowed");
        next();
    } else {
        console.log("External Access not allowed");
        res.render(`${path.dirname(__dirname)}/public/inhibited.html`);
    }
});

app.get('/', function (req, res) {
    res.render(`${path.dirname(__dirname)}/public/index.html`);
})

app.listen(port);

console.log(`listening on ${port}!`);