var express = require('express');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var ejs = require('ejs');

var db = require('./db');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var words = [
  {
    id: 1,
    phrase: 'Гавно блядь'
  }
];
/* Добавить фразу */
app.post('/', function (req, res) {
  var phrase = {
    phrase: req.body.phrase
  };
  db.get().collection('words').insertOne(phrase, function (err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(phrase);
  });
});

/* Получение одной фразы */
app.get('/:id', function (req, res){
  db.get().collection('words').findOne({ _id: ObjectID(req.params.id) },
    function (err, doc) {
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }
      res.render('phrase', {id: doc._id, phrase: doc.phrase});
    });
});
/* Изменить фразу */
app.put('/:id', function (req, res){
  db.get().collection('words').replaceOne(
    { _id: ObjectID(req.params.id) },
    { phrase: req.body.phrase },
    function (err, result) {
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    }
  );
});
/* Удалить фразу */
app.delete('/:id', function (req, res) {
  db.get().collection('words').deleteOne(
    { _id: ObjectID(req.params.id)},
    function (err, result) {
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    });
});
/* Получить все фразы */
app.get('/', function (req, res) {
  db.get().collection('words').find().toArray(function (err, docs) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }
    //for(i = 0; i < docs.length; i++){
    for (var phrase in docs){
      res.render('phrases', {data: docs});
      console.log(docs);
    }

  //  }
  });
});

db.connect('mongodb://localhost/dbase',
    function (err) {
      if (err) return console.log(err);

      app.listen(3000, function(){
        console.log('work...');
      });
});
