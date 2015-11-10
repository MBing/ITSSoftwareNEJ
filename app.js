var express = require('express'),
    logger = require('express-log'),
    stylus = require('stylus'),
    nib = require('nib');


var app = express();

function compile(str, path) {
    "use strict";
    return  stylus(str)
        .set('filename', path)
        .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger());
app.use(stylus.middleware(
    {   src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    "use strict";
    res.render('index',
        {title : 'Home'}
    );
});

app.listen(3000);