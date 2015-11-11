var express = require('express'),
    morgan = require('morgan'),
    stylus = require('stylus'),
    nib = require('nib');


var app = express(),
    port = process.env.PORT || 3000;

function compile(str, path) {
    "use strict";
    return  stylus(str)
        .set('filename', path)
        .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.use(morgan(':id :method :url :response-time'));
app.use(stylus.middleware(
    {   src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static('public'));

app.get('/', function (req, res) {
    "use strict";
    res.render('index',
        {title : 'Home'}
    );
});


app.listen(port, function () {
    "use strict";
    console.log("listening on port: " + port);
});
