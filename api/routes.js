// routes file

var Todo = require('./models/todoModel.js');

module.exports = function(app){

  // GET ===============================
  // Gets all todos
  app.get('/api/todos', function(req, res){

    Todo.find({}, function(err, todos){
      
      if(err)
        res.send(err);

      res.json(todos);

    }); 
  });

  // GET TODO ===============================
  // Returns a single todo by _id
  app.get('/api/todos/:todo_id', function(req, res){
    
    Todo.findOne({
      _id : req.params.todo_id
    }, function(err, todo){
      
      if(err)
        res.send(err);

      res.json(todo);
      
    });
  });

  // CREATE ===============================
  // Creates and saves a new todo
  app.post('/api/todos', function(req, res){
    console.log(req.body);
    Todo.create({
      todo    : req.body.text,
      author  : 'Big Lebowski',
      done    : false
    }, function(err){

      if(err)
        res.send(err);

      Todo.find({}, function(err, todos){

        if(err)
          res.send(err);

        res.json(todos);

      });
    });
  });

  // REMOVE ===============================
  // Deletes a todo by id
  app.delete('/api/todos/:todo_id', function(req, res){

    Todo.remove({
      _id : req.params.todo_id
    }, function(err){
      
      if(err)
        res.send(err);

      Todo.find({}, function(err, todos){

        if(err)
          res.send(err);

        res.json(todos);

      });
    });
  });
};