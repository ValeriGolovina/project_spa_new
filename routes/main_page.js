module.exports = function(app){ //app-это самое приложение
    app.get('/', function(req,res,next){
    res.render('posts/index');
})
}