const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = require('../token');


router.get('/add',(req,res)=>{
    let studentId = req.query.studentId;
    let studentName = req.query.studentName;
    let studentPsd = req.query.studentPsd;
    bcrypt.genSalt(10, function(err, salt) { //10是等级的意思
            bcrypt.hash(studentPsd, salt, function(err, hash) { //第一个参数是加密的内容
            // Store hash in your password DB.
            if(err) throw err;
            let newUser = new User({
                studentId,
                studentName,
                studentPsd:hash
            })
            User(newUser).save()
                         .then(()=>{
                             res.json({"code":"1","msg":"添加成功"});
                         })
                         .catch(err=>{
                             console.log(err);
                         })
            });
        });
})

router.post('/login',(req,res)=>{
  User.findOne({studentId:req.body.studentId})
      .then(use=>{
            if(!use){
                res.json({"code":"0","msg":"没有该用户"});
            }else{
                bcrypt.compare(req.body.studentPsd, use.studentPsd)
                      .then(check=>{
                          if(!check){
                              res.json({"code":"0","msg":"密码错误"});
                          }else{
                            const token = jwt.sign({
                                studentId:use.studentId,
                                studentPsd:use.studentPsd
                                },'my_token',{expiresIn:'1d'})
                              res.json({"code":"1","msg":"登陆成功","token":token,"name":use.studentName,"studentId":use.studentId,"studentPayPsd":use.studentPayPsd,"balance":use.balance});
                          }
                      })
            }
      })
})


router.get('/getmsg',(req,res)=>{
    let status = token(req.query.token);
    if(status == 0){
        res.json({"code":"0","msg":"登录过时！"});
        return;
    }
    User.findOne({studentId:status.studentId})
        .then(use=>{
            res.json({"code":"1","msg":{"studentId":use.studentId,"studentName":use.studentName,"studentPsd":use.studentPsd,"studentPayPsd":use.studentPayPsd,"balance":use.balance}});
        })
})

router.get('/updata',(req,res)=>{
    let status = token(req.query.token);
    let price = parseInt(req.query.price);
    if(status == 0){
        res.json({"code":"0","msg":"登录过时！"});
        return;
    }
    User.findOne({studentId:status.studentId})
    .then(use=>{
        let balance = parseInt(use.balance) + price;
        User.update({studentId:status.studentId},{$set: {balance}})
            .then(()=>{
                User.findOne({studentId:status.studentId})
                    .then(use=>{
                        res.json({"code":"1","msg":{"studentId":use.studentId,"studentName":use.studentName,"studentPsd":use.studentPsd,"studentPayPsd":use.studentPayPsd,"balance":use.balance}});
                    })
            })
    })
})

router.get('/money',(req,res)=>{
    let status = token(req.query.token);
    let price = req.query.price;
    if(status == 0){
        res.json({"code":"0","msg":"登录过时！"});
        return;
    }
    User.findOne({studentId:status.studentId})
    .then(use=>{
        User.update({studentId:status.studentId},{$set: {balance:price}})
            .then(()=>{
                User.findOne({studentId:status.studentId})
                    .then(use=>{
                        console.log(use);
                        res.json({"code":"1","msg":{"studentId":use.studentId,"studentName":use.studentName,"studentPayPsd":use.studentPayPsd,"balance":use.balance}});
                    })
            })
    })
})

router.post('/updatepsd',(req,res)=>{
    let status = token(req.body.token),
        psd = req.body.studentPsd,
        payPsd = req.body.payPsd;
    if(status == 0){
        res.json({"code":"0","msg":"登录过时！"});
        return;
    }
    if(psd == ''){
        User.findOne({studentId:status.studentId})
        .then(use=>{
                User.update({studentId:status.studentId},{$set: {studentPayPsd:payPsd}})
                .then(()=>{
                    res.json({"code":"1","msg":"修改成功！"})
                })
            })
            return ;
    }
    if(payPsd == ''){
        User.findOne({studentId:status.studentId})
        .then(use=>{
            bcrypt.genSalt(10, function(err, salt) { //10是等级的意思
                bcrypt.hash(psd, salt, function(err, hash) {
                if(err) throw err;
                User.update({studentId:status.studentId},{$set: {studentPsd:hash}})
                .then(()=>{
                    res.json({"code":"1","msg":"修改成功！"})
                })
            })
        })
    })
    return ;
}
    User.findOne({studentId:status.studentId})
        .then(use=>{
            bcrypt.genSalt(10, function(err, salt) { //10是等级的意思
                bcrypt.hash(psd, salt, function(err, hash) { //第一个参数是加密的内容
                // Store hash in your password DB.
                if(err) throw err;
                User.update({studentId:status.studentId},{$set: {studentPsd:hash,studentPayPsd:payPsd}})
                .then(()=>{
                    res.json({"code":"1","msg":"修改成功！"})
                })
            })
        })
    })
})
router.get('/get',(req,res)=>{
    User.find({})
        .then(result=>{
            console.log(result);
        })
})
module.exports = router;