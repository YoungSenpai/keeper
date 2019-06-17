var MongoClient = require('mongodb').MongoClient;

var state = {
  db: null
};

exports.connect = connect;
exports.get = get;

function connect(url, done) {
  if(state.db){
    return done();
  }
  MongoClient.connect(url,
    { useNewUrlParser: true },
    function (err, db) {
    if(err) {
      return done(err);
    }
    state.db = db.db('dbase');
    done();
  });
};

function get() {
    return state.db;
}
