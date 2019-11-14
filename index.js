const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const urlEncoded = bodyParser.json();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thea:thea@cluster0-qjquk.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });

const cors = require('cors');
app.use(cors());

const User = mongoose.model('user',{
    name: String,
    age: Number
});

app.use(express.static(__dirname+'/dist/app')); 

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/dist/app/index.html');
});

app.get('/users', (req, res) => {
    User.find({},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.post('/user', urlEncoded, (req, res) => {
    var user = new User({
        name: req.body.name,
        age: req.body.age
    });
    user.save((err, data) => {
        if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.delete('/user/:id', (req, res) => {
    User.deleteOne({_id:req.params.id},(err,data) => {
    if(err) res.json({msg:'Invalid Request'});
        res.json(data);
    });
});

app.put('/user/:id', urlEncoded, (req, res) => {
    User.updateOne({_id:req.params.id},{
        name: req.body.name,
        age: req.body.age
    }, (err, data) => {
        if(err) res.json({msg:'Invalid request'});
            res.json(data);
    });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);

})