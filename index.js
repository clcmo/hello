const express = require('express'); // Obviously, we need Express.
const pug = require('pug'); // And we couldn't render Pug without Pug.
require('jstransformer-markdown-it'); // This needs to be installed for Pug to use it.

const site = require('./config/site.json');

const app = express();
app.use(express.static('public'));

function render(file) {
    return pug.renderFile(file, { site });
}

app.get('/', function (req, res) {
    res.send(render('public/index.pug'));
});

app.get('/en', function (req, res) {
    res.send(render('public/en.pug'));
});

app.get('/rules', function (req, res) {
    res.send(render('public/rules.pug'));
});

app.get('/regras', function (req, res) {
    res.send(render('public/regras.pug'));
});

app.listen(8080, function() {
    console.log('Server up!');
});