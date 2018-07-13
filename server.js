const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ejs = require('ejs');
const engine = require('ejs-mate');
const fileUpload = require('express-fileupload');

const app = express();

mongoose.connect('mongodb://golovina:spancha1234@ds263640.mlab.com:63640/project_spa_ep', function(err){
    if(err){
        console.log(err);
    }else{
        console.log('connected to db');
    }
})

//middleware
app.use(fileUpload());
app.use(express.static(__dirname + '/public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs'); //используем иджс во вьюхах
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true 
}));
app.use(morgan('dev'));

require('./routes/main_page')(app);
require('./routes/posts')(app);

app.listen(8090, function(err){
    if(err){
            console.log(err);
        }else{
            console.log('connected to port 8090');
        }    
})