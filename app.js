var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var objects = require('./routes/objects');
var fs = require('fs');

var Objects = require('./models/objects');

var objCollections=require("./data/objectCollection.json");
var app = express();


// connect to db

var db = mongoose.connection;
var conn= mongoose.connect('mongodb://localhost:27017/objDB');

db.on('error', function (err) {
    console.log('connected ' + err.stack);
});


db.on('disconnected', function(){
    console.log('disconnected');
});


db.on('connected',function(){
   
   // empty the collection if already present //
   console.log('con connected');

   mongoose.connection.collections['objects'].drop( function(err) {
      console.log('collection dropped');
  });


 
   var obj=objCollections.objects;
   for(var i=0;i<obj.length;i++){

         var record = new Objects({
               color: obj[i].color,
               id:obj[i].id

              });

          record.save( function( err, data ){
 
                if(!err){
          
                   // console.log('Saved row');
 
                }
 
                else{
 
                    console.log(err);
 
                }
            });
    
      
   }
   
  });

//make sure that we are closing the connection to mongo if something happens to node (like Ctrl + C)
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
})




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/objects', objects);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
