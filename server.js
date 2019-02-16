const express = require('express');
const mongoose = require('mongoose');
const user = require('./router/user');
const jdList = require('./router/jdList');
const bodyParser = require('body-parser');
const cityList = require('./router/cityList');
const order = require('./router/order');
const app = express();

//链接mongodb
mongoose.connect("mongodb://localhost:27017/node-sys")
        .then(()=>{
            console.log("mongodb connected");
        })
        .catch(err=>{
            console.log(err);
        })

app.get('/',(req,res)=>{
    res.json({"msg":"123"});
})

//使用中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user',user);
app.use('/jdList',jdList);
app.use('/cityList',cityList);
app.use('/order',order);


app.listen('3000');
console.log('Server is running...');