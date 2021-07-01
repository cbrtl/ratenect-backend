const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect("mongodb+srv://ratenect:ratenect123@cluster0.57zvw.mongodb.net/ratenectDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(3000,function(){
    console.log('Server started at port 3000');
});

app.get('/',function(req,res){
    res.send("<h1>Welcome to Ratenect!<h1>");
});