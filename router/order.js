const express = require('express');
const router = express.Router();
const Order = require('../model/Order')
const token = require('../token')

router.get('/add',(req,res)=>{
    let {studentId,orderId,code , price ,start,end,startTime,endTime,time,name,tell,type} =req.query;
    let newOrder = {
        studentId,
        orderId,
        name,
        tell,
        type,
        msg:{
            code,
            price,
            start,
            end,
            startTime,
            endTime,
            time
        }

    }
    Order.create(newOrder)
         .then(()=>{
                res.json({"code":"1","msg":"订单下单成功！"})
         })
         .catch(err=>{
             console.log(err);
            res.json({"code":"0","msg":"订单下单失败"})

         })
})

router.get('/get',(req,res)=>{
    let status = token(req.query.token);
    if(status == 0){
        res.json({"code":"0","msg":"登录过时！"});
        return;
    }
    Order.find({studentId:status.studentId})
        .then(order=>{
            res.json({"code":"1","data":order})
        })
})

router.get('/getorder',(req,res)=>{
    Order.find({})
        .then(order=>{
            res.json({"code":"1","data":order})
        })
})

router.get('/sreachorder',(req,res)=>{
    let name = req.query.name;
    Order.find({name})
        .then(order=>{
            res.json({"code":"1","data":order})
        })
})

module.exports = router;