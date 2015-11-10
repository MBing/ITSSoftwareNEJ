var express = require('express'),
    morgan = require('morgan'),
    stylus = require('stylus'),
    nib = require('nib'),
    bs = require('browser-sync').create();


var app = express();

function compile(str, path) {
    "use strict";
    return  stylus(str)
        .set('filename', path)
        .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan(':id :method :url :response-time'))
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
bs.init({
    server: true
});

// Now call methods on bs instead of the
// main browserSync module export
bs.reload("*.css");
bs.reload("*.html");

app.listen(3000);
