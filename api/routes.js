// routes file

var doc = require('./models/docModel.js');

module.exports = function(app){

  // GET ===============================
  // Gets all docs
  app.get('/api/docs', function(req, res){

    doc.find({}, function(err, docs){
      
      if(err)
        res.send(err);

      res.json(docs);

    }); 
  });

  // GET doc ===============================
  // Returns a single doc by _id
  app.get('/api/docs/:doc_id', function(req, res){
    
    doc.findOne({
      _id : req.params.doc_id
    }, function(err, doc){
      
      if(err)
        res.send(err);

      res.json(doc);
      
    });
  });

  // CREATE ===============================
  // Creates and saves a new doc
  app.post('/api/docs', function(req, res){

    doc.create({
      text    : req.body.text,
      done    : false
    }, function(err){

      if(err)
        res.send(err);

      doc.find({}, function(err, docs){

        if(err)
          res.send(err);

        res.json(docs);

      });
    });
  });

  // REMOVE ===============================
  // Deletes a doc by id
  app.delete('/api/docs/:doc_id', function(req, res){

    doc.remove({
      _id : req.params.doc_id
    }, function(err){
      
      if(err)
        res.send(err);

      doc.find({}, function(err, docs){

        if(err)
          res.send(err);

        res.json(docs);

      });
    });
  });
};