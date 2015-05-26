var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var router = express.Router()
var _ = require('lodash')
var app = express()

app.set('views', __dirname)
app.set('view engine', 'jade')
  
app.use(logger('dev'))
app.use(cookieParser())
app.use(require('stylus').middleware(path.join(__dirname, 'public')))
app.use('/client', express.static('client'))
app.use('/_build', express.static('client/_build'))
app.use('/node_modules', express.static(path.join(__dirname, 'client/node_modules')))
//app.use(express.static(path.join(__dirname, 'client/node_modules')))

app.get('/', function(req, res, next) {
  res.render('index', { title: '404-Test' })
})

var jsonParser = bodyParser.json()
var items = []
var itemsToDisplay = 5

var pushItem = function(item){
  item.id = _.uniqueId()
  items.push(item)
}

app.get('/api/time', function(req, res, next) {
  res.json(items.slice(-itemsToDisplay))
})

app.post('/api/time', jsonParser, function(req, res, next) {
  pushItem(req.body)
  res.json({ok:true})
})

app.delete('/api/time/:id', function(req, res, next) {
  _.remove(items, function(item){
    return item.id == req.params.id;    
  })
  res.json({ok:true})
})

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})


app.listen(3000)