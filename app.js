'use strict';
const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
const port = 3000
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const fileName = 'question.json';

const saveFile = (data) => {
    fs.writeFile(fileName, data, 'utf8', (err) => {
        console.log(err);
    })
}

const readFile = () => {
    let result = fs.readFileSync(fileName);
    if (result) {
        result = JSON.parse(result);
    } else {
        result = [];
    }
    return result;
}
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/questions', (req, res) => {
    res.send(readFile())
});
app.post('/question', (req, res) => {
    let result = readFile();
    if (!result) {
        result = [];
    }
    result.push(req.body);
    saveFile(JSON.stringify(result));
    res.send(JSON.parse(`{ "result": "OK" }`));
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))