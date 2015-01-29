var express = require('express'),
        app = express();

app
        .use(express.static('./public'))
        .get('/', function (req, res) {
            res.sendfile('public/index.html')
        })
        .post('/', function (req, res) {
            res.sendfile('public/success.html')
        })
        .listen(3000);
