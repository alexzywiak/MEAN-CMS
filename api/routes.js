// routes file

var Post = require('./models/postModel.js');

module.exports = function(app){

  // GET ===============================
  // Gets all posts
  app.get('/api/posts', function(req, res){

    Post.find({}, function(err, posts){
      
      if(err)
        res.send(err);

      res.json(posts);

    }); 
  });

  // GET post ===============================
  // Returns a single post by _id
  app.get('/api/posts/:post_id', function(req, res){
    
    Post.findOne({
      _id : req.params.post_id
    }, function(err, post){
      
      if(err)
        res.send(err);

      res.json(post);
      
    });
  });

  // CREATE ===============================
  // Creates and saves a new post
  app.post('/api/posts', function(req, res){

    var current   = new Date(),
        title     = req.body.title || "post_" + Date.parse(current),
        author    = req.body.author || "Annonymous",
        permalink = title.substr(0, 18).replace(" ", "_");

    Post.create({
      title   : title,
      body    : req.body.body,
      author  : author,
      permalink : permalink,
      done    : false
    }, function(err){

      if(err)
        res.send(err);

      Post.find({}, function(err, posts){

        if(err)
          res.send(err);

        res.json(posts);

      });
    });
  });

  // UPDATE ===============================
  // Updates a post
  app.post('/api/updatePost/:post_id', function(req, res){

    Post.findOne(
      { _id : req.params.post_id },
      function(err, post){
        
        if(err) throw err;
        
        post.title  = req.body.title;
        post.body   = req.body.body;

        post.save(function(err, post){
          if(err) throw err;
          res.json(post);
        });
      }
    );
  });

  // REMOVE ===============================
  // Deletes a post by id
  app.delete('/api/posts/:post_id', function(req, res){

    Post.remove({
      _id : req.params.post_id
    }, function(err){
      
      if(err)
        res.send(err);

      Post.find({}, function(err, posts){

        if(err)
          res.send(err);

        res.json(posts);

      });
    });
  });
};