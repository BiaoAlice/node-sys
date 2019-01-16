const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
                                },'my_token',{expiresIn:'60s'})
                              res.json({"code":"1","msg":"登陆成功","token":token,"name":use.studentName});
                          }
                      })
            }
      })
})

//token 验证
router.get('/token',(req,res)=>{
    let token = req.query.token;
    jwt.verify(token, 'my_token', (error, decoded) => {
        if (error) {
            res.json({"code":"0","msg":"登录已过期"});
            return;
        }
        console.log(decoded) //在这里验证token时效的时候，将当前的时间/1000向下取整
        })
})

router.get('/get',(req,res)=>{
    User.find({})
        .then(result=>{
            console.log(result);
        })
})
module.exports = router;