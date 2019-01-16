const express = require('express');
const router = express.Router();
const jdList = require('../model/jdList');

router.get('/getlist',(req,res)=>{
    jdList.find({})
          .then(result=>{
            res.json({"code":"1","data":result})
          })
          .catch(err=>{
              console.log(err);
          })
})
module.exports = router;