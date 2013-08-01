
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , routerReader = require('./helpers/routerReader')
  , fs = require('fs')
  , marked = require( "marked" )
  , mde = require('markdown-extra');

marked.setOptions({
  sanitize: false
});

var app = express();

var routerPath = './public/javascripts/PresentationRouter.js';

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon('public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var routeMap = routerReader(fs.readFileSync(routerPath, 'utf8'));

function fileName(number) {
  if(typeof number != 'number') {
    number = parseInt(number, 10);
  }
  number = number + '';
  if(number.length == 1) {
    number = '0' + number;
  }
  return number + '.md';
}

function toHTML(md) {
  var html = marked(mde.content(md));
  //var html = markdown.toHTML(md);
  //html = html.replace('<code>','').replace('</code>','');
  return html;
}

app.get('/inject/:id', function(req, res) {
  var index = req.params.id;
  var mds = fs.readdirSync('content');
  for(var i = mds.length - 1; i >= index; i--) {
    var content = fs.readFileSync('content/' + mds[i], 'utf8');
    var outputFile = fileName(parseInt(mds[i].split('.')[0], 10) + 1);
    fs.writeFileSync('content/' + outputFile, content);
  }
  res.send(index);
});

app.get('/splice/:id', function(req, res) {
  var index = parseInt(req.params.id, 10) + 1;
  console.log(index);
  var mds = fs.readdirSync('content');
  for(var i = index; i < mds.length - 1; i++) {
    var content = fs.readFileSync('content/' + mds[i], 'utf8');
    var outputFile = fileName((parseInt(mds[i].split('.')[0], 10) - 1));
    fs.writeFileSync('content/' + outputFile, content);
  }
  res.send(index);
});

app.get('/data/slide', function(req,res) {
  var mds = fs.readdirSync('content');
  var slides = [];
  var count = 1;
  for(var i = 0; i < mds.length; i ++) {
    var s = mds[i].split('.');
    if(s.length === 2 && s[1] == 'md') {
      slides.push({
        html: toHTML(fs.readFileSync('content/' + mds[i], 'utf8')),
        id: count
      });
      count++;
    }
  }

  res.send(slides);
})

app.get('/data/slide/:id', function(req, res){
  if(req.params.id && parseInt(req.params.id, 10) == req.params.id) {
    var name = req.params.id + '';
    if(name.length == 1) {
      name = '0'+name;
    }
    res.send({
      html: toHTML(fs.readFileSync('content/' + name + '.md', 'utf8')),
      id: req.params.id
    });
  } else {
    res.send({
      html: 'error'
    });
  }
  res.send('hey');
});

for(var route in routeMap) {
	var action = routeMap[route];

	app.get('/' + route, (function(action) {
		return function(req, res) {
			
			var params = []
			for(var name in req.params) {
				params.push(req.params[name]);
			}
			
			res.render('index', { action: routeMap[action], params: JSON.stringify(params) });
		}
	})(route, action));
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
