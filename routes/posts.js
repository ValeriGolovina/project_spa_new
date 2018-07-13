var path = require('path'); //вставаить в определенную папку
var Post = require('../models/post');

module.exports = function(app){
  app.route('/posts/upload')
      .get(function(req, res, next){
        res.render('posts/upload');
})
    .post(function(req, res, next){
      var post = new Post();
      post.description = req.body.description;
      post.user = req.body.user;
      post.isSave = false;
      
      if(!req.files) return json('error');
      
      var sampleFile = req.files.sampleFile;
      var fileName = Math.random().toString(35).slice(2) + '.jpg';
      var path = './public/images/' + fileName; //полный путь
      post.path = '/images/' + fileName; //путь в в обьект
      
      sampleFile.mv(path, function(error){ //отправляем с клиентской стороны на сервер
          if(error) return res.status(500).send(error);
      })
      
      post.save(function(error){ //сохраняем в бд
          if(error) return error;
          
          res.redirect('/posts/index');
      })
  })
    app.get('/posts/index', function(req, res, next){
        Post.find({}, function(error, posts){
            res.render('posts/index',{posts : posts});
        })
    })
    
    app.get('/posts/information/:id', function(req, res, next){
        Post.findOne({_id: req.params.id})
        .exec(function(error, foundPost){
            res.render('posts/information', {post: foundPost});
        })
    })
    
    app.get('/posts/delete/:id', function(req, res, next){
        Post.find({_id: req.params.id}).remove()
            .exec(function(error, deletedImage){
            res.redirect('/posts/index');
        })
    })
        
}