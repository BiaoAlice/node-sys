const express = require('express');
const router = express.Router();
const cityList = require('../model/cityList');

router.get('/getList',(req,res)=>{
    cityList.find({})
            .then(result=>{
                res.json({"data":result});
            })
})

module.exports = router;