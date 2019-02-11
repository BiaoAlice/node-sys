const express = require('express');
const mongoose = require('mongoose');
const user = require('./router/user');
const jdList = require('./router/jdList');
const bodyParser = require('body-parser');
const cityList = require('./router/cityList');
const app = express();

//链接mongodb
mongoose.connect("mongodb://localhost:27017/node-sys")
        .then(()=>{
            console.log("mongodb connected");
        })
        .catch(err=>{
            console.log(err);
        })

// app.get('/',(req,res)=>{
//     let msg =  token();
//     console.log(msg);
//     res.json({msg});
// })

//使用中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user',user);
app.use('/jdList',jdList);
app.use('/cityList',cityList);


app.listen('3000');
console.log('Server is running...');