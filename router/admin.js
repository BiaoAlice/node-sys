const express = require('express');
const router = express.Router();
const Admin = require('../model/Admin')

router.post('/getuser',(req,res)=>{
    let {userName , userPsd} = req.body;
    let newAdmin = {
        userName,
        userPsd
    }
    Admin.findOne(newAdmin)
         .then(admin=>{
                if(admin){
                    res.json({"code":"1","msg":"登录成功","userName":admin.userName})
                }else{
                    res.json({"code":"0","msg":"用户不存在/密码不正确"})
                }
             
         })
})
      

module.exports = router;